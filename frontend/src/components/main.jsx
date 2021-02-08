import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'preact/hooks';

import { Welcome } from './welcome.jsx';
import { Game } from './game.jsx';

import styles from './main.scss';

let connectionOpts;
let clientId;
try {
  clientId = localStorage.getItem('clientId');

  if (clientId) connectionOpts = {
    query: {
      clientId
    }
  };
} catch(e){}

const socket = io(window.location.origin, connectionOpts);

socket.on('reconnect_attempt', () => {
  socket.io.opts.query = {
    clientId,
  }
});

socket.on('connect', () => {
  clientId = socket.io.engine.id;
  console.log("Connected", clientId);

  localStorage.setItem('clientId', clientId);
});

window.onpopstate = function (e) {
  window.location.reload();
};

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

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Story Pointing Poker!</h1>
      <p className={styles.tagLine}>
        A free and <a href="https://github.com/julianpoy/storypointingpoker">open source</a> version of pointing poker.
      </p>
      
      {room ? (
        <Game setRoom={setRoom} room={room} socket={socket} />
      ) : (
        <Welcome setRoom={setRoom} socket={socket} />
      )}
    </div>
  );
};
