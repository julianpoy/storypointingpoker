import { io } from 'socket.io-client';
import { useState, useEffect } from 'preact/hooks';

import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

const socket = io();

export const Main = () => {
  const [room, setRoom] = useState(null);

  const roomCode = (room && room.code) || null;
  useEffect(() => {
    if (roomCode) socket.emit('subscribe', roomCode);
  }, roomCode);

  if (!room) return <Welcome setRoom={setRoom} />;

  return (
    <Game room={room} socket={socket} />
  );
};
