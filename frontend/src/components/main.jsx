import { io } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

export const Main = () => {
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io());
  }, [])

  const roomUpdate = useCallback((roomCode) => {
    console.log(roomCode)
    if(!room || room.roomCode !== roomCode) return
    console.log(`Room updated, fetching room: ${roomCode}`)
    const room = fetch(`/rooms/${roomCode}`, {
      method: 'GET',
    }).then((resp) => resp.json());

    console.log(`setting room ${room}`)
    setRoom(room);
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on('room-update', roomUpdate)
  }, [socket])

  if(!socket) return <h2>Connecting...</h2>

  if (!room) return <Welcome setRoom={setRoom} socket={socket} />;

  return (
    <Game room={room} socket={socket} />
  );
};
