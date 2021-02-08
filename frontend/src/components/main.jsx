import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'preact/hooks';
import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

const socket = io();

export const Main = () => {
  const [room, setRoom] = useState(null);
  const roomRef = useRef();
  roomRef.current = room;

  useEffect(() => {
    socket.on('room-update', async roomCode => {
      const room = roomRef.current;
      if(!room || room.code !== roomCode) return;

      const roomUpdate = await fetch(`/rooms/${roomCode}`, {
        method: 'GET',
      }).then((resp) => resp.json());

      setRoom(roomUpdate);
    });
  }, []);

  if (!room) return <Welcome setRoom={setRoom} socket={socket} />;

  return (
    <Game room={room} socket={socket} />
  );
};
