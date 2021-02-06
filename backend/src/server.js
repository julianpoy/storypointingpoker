const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const os = require('os');

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

const rooms = {};

app.get('/room/:id', async (req, res) => {
  const room = rooms[req.params.id];

  if (!room) res.status(404).send("Not found");

  res.status(200).send();
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
