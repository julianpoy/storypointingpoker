import PropTypes from 'prop-types';
import { useState, useEffect } from 'preact/hooks';

import { CreateRoom } from './createRoom.jsx';

import buttonStyles from '../sharedCss/button.scss';
import inputStyles from '../sharedCss/input.scss';
import styles from './welcome.scss';

let launchRoomCode = '';
try {
  const urlParams = new URLSearchParams(window.location.search);
  launchRoomCode = urlParams.get('sessionCode') || '';
} catch(e) {}

let savedName = '';
try {
  savedName = localStorage.getItem('nickname') || '';
} catch(e) {}

export const Welcome = ({ setRoom, socket }) => {
  const [roomCode, setRoomCode] = useState(launchRoomCode);
  const [userName, setUserName] = useState(savedName);
  const [showCreating, setShowCreating] = useState(false);

  const joinRoom = async () => {
    const room = await fetch(`/rooms/${roomCode}`, {
      method: 'GET',
    }).then((resp) => resp.json());

    setRoom(room);
    socket.emit('join', roomCode, userName);

    try {
      localStorage.setItem('nickname', userName);
    } catch(e){}
  };

  useEffect(() => {
    if (roomCode && userName) {
      joinRoom();
    }
  }, []);

  const onRoomCodeInput = (event) => {
    setRoomCode(event.target.value);
  };

  const onUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      {showCreating ? (
        <CreateRoom setRoom={setRoom} socket={socket} cancelCreating={() => setShowCreating(false)} />
      ) : (
        <>
          <button
            className={buttonStyles.button}
            onClick={() => setShowCreating(true)}
          >
            Create a New Session
          </button>
          <div className={styles.joinExistingMessage}>
            or, join an existing session
          </div>
          <input
            value={userName}
            className={inputStyles.input}
            type="text"
            placeholder="Your Nickname"
            onChange={onUserNameInput}
          ></input>
          <br />
          <input
            value={roomCode}
            className={inputStyles.input}
            type="text"
            placeholder="Session Code"
            onChange={onRoomCodeInput}
          ></input>
          <br />
          <button
            className={buttonStyles.button}
            onClick={joinRoom}
          >
            Join Session
          </button>
        </>
      )}
    </div>
  );
};

Welcome.propTypes = {
  setRoom: PropTypes.function,
  socket: PropTypes.any
};
