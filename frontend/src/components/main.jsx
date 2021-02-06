import { io } from 'socket.io-client';
import { useState } from 'preact/hooks';

import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

const socket = io();

export const Main = () => {
  const [room, setRoom] = useState(null);

  if (!room) return <Welcome setRoom={setRoom} />;

  return (
    <Game room={room} socket={socket} />
  );
};
