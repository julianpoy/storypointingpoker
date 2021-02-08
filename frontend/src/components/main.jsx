import { io } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

const socket = io();

export const Main = () => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    socket.on('room-update', roomCode => {
    if(!room || room.roomCode !== roomCode) return
    const newRoom = fetch(`/rooms/${roomCode}`, {
      method: 'GET',
    }).then((resp) => resp.json());

    setRoom(newRoom);
    })
  }, [])

  if(!socket) return <h2>Connecting...</h2>

  if (!room) return <Welcome setRoom={setRoom} socket={socket} />;

  return (
    <Game room={room} socket={socket} />
  );
};
