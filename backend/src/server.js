const express = require('express');
const morgan = require('morgan');
const os = require('os');
const path = require('path');
const pug = require('pug');
const crypto = require('crypto');
const url = require('url');

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const server = app.listen(parseInt(process.env.PORT || 3000, 10));

const rooms = {};
const roomCodesByClientId = {};

const generateRandomString = length => {
  const alphabet = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  const alphabetLength = alphabet.length;

  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  return randomString;
}

const ROOM_CODE_LENGTH = 6;
const generateRoomCode = () => {
  const roomCode = generateRandomString(ROOM_CODE_LENGTH);

  if (!rooms[roomCode]) {
    return roomCode;
  }

  return generateRoomCode();
};

const CLIENT_ID_SIZE = 50;
const generateClientId = () => {
  return crypto.randomBytes(CLIENT_ID_SIZE).toString('hex');
};

const isValidRoomCode = roomCode => {
  const containsIllegalChar = (/[^A-Z0-9]/).test(roomCode);
  
  return !containsIllegalChar && roomCode.length === ROOM_CODE_LENGTH;
}

// TODO: Move Socket.Io to a separate file

const io = require('socket.io')(server);

io.engine.generateId = req => {
  const parsedUrl = new URL(req.url, 'https://example.com/'); // URL constructor requires baseUrl as second param
  const prevId = parsedUrl.searchParams.get('clientId')

  if (prevId && prevId !== 'null') {
    console.log("Client reconnecting", prevId);
    return prevId
  }
  return generateClientId();
}

io.on('connection', socket => {
  const clientId = socket.client.id;
  console.log("Client connected!", clientId);

  // Have user rejoin any rooms they were previously in
  if (roomCodesByClientId[clientId]) roomCodesByClientId[clientId].forEach(roomId => socket.join(roomId));
  else roomCodesByClientId[clientId] = [];

  socket.on('join', (roomCode, name) => {
    console.log("Request to join room: ", roomCode);

    const room = rooms[roomCode];

    if (!room) return;

    socket.join(roomCode);

    if (!roomCodesByClientId[clientId].includes(roomCode)) roomCodesByClientId[clientId].push(roomCode);

    const existingMember = room.members.find(member => member.ioClientId === clientId);

    if (existingMember) return;

    room.members.push({
      ioClientId: clientId,
      name,
      vote: null,
    });

    io.to(roomCode).emit('room-update', roomCode);
  });

  socket.on('vote', (roomCode, voteValue) => {
    const room = rooms[roomCode];
    if (!room) return;

    const member = room.members.find(member => member.ioClientId === clientId);
    if (member) member.vote = voteValue;

    io.to(roomCode).emit('room-update', roomCode);
  });

  socket.on('show', (roomCode) => {
    const room = rooms[roomCode];
    if (!room) return;

    room.state = 'show';

    io.to(roomCode).emit('room-update', roomCode);
  });

  socket.on('reset', (roomCode) => {
    const room = rooms[roomCode];
    if (!room) return;

    room.state = 'start';
    room.members.forEach(member => member.vote = null);

    io.to(roomCode).emit('room-update', roomCode);
  });

  socket.on('disconnect', () => {
    console.log("User disconnected", clientId);
    roomCodesByClientId[clientId].map(roomCode => {
      const room = rooms[roomCode];
      const member = room.members.find(member => member.ioClientId === clientId);
      if (!member) return;

      room.members.splice(room.members.indexOf(member), 1);

      io.to(room.code).emit('room-update', room.code);
    });
  });
});

// TODO: Move these routes to a separate file

app.get('/', (req, res) => res.render('frontend', {
  FRONTEND_ASSET_PATH: process.env.FRONTEND_ASSET_PATH
}));


app.get('/rooms/:id', (req, res) => {
  const room = rooms[req.params.id];

  if (!room) return res.sendStatus(404);

  res.status(200).send(room);
});

app.post('/rooms', (req, res) => {
  const room = {
    code: generateRoomCode(),
    members: [],
    state: 'start',
    pointingScale: req.body.pointingScale,
  };

  rooms[room.code] = room;

  res.status(200).send(room);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
