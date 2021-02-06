const express = require('express');
const morgan = require('morgan');
const os = require('os');
const path = require('path');
const pug = require('pug');

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('frontend'));

const rooms = {};

app.get('/rooms/:id', (req, res) => {
  const room = rooms[req.params.id];

  if (!room) return res.sendStatus(404);

  res.status(200).send(room);
});

const ROOM_CODE_LENGTH = 5;
const generateRoomCode = () => {
  const alphabet = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  const alphabetLength = alphabet.length;

  let roomCode = '';
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    roomCode += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  if (!rooms[roomCode]) {
    return roomCode;
  }

  return generateRoomCode();
}

app.post('/rooms', (req, res) => {
  const room = {
    code: generateRoomCode(),
    members: [],
    state: 'start',
  };

  rooms[room.code] = room;

  res.status(200).send(room);
});

app.post('/rooms/:id/join', (req, res) => {
  const { socketClientId, name } = req.body;

  if (!socketClientId || !name) return res.sendStatus(400);

  const room = rooms[req.params.id];

  if (!room) return res.sendStatus(404);

  room.members.push({
    socketClientId,
    name,
    lastPing: Date.now(),
  });
  
  res.status(200).send(room);
});

const server = app.listen(parseInt(process.env.PORT || 3000, 10));

const io = require('socket.io')(server);
io.on('connection', () => {
  console.log("connection!");
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
