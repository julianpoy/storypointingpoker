import PropTypes from 'prop-types';
import { useState } from 'preact/hooks';

import buttonStyles from '../sharedCss/button.scss';
import inputStyles from '../sharedCss/input.scss';
import styles from './createRoom.scss';

let savedName = '';
try {
  savedName = localStorage.getItem('nickname') || '';
} catch(e) {}

export const CreateRoom = ({ setRoom, socket, cancelCreating }) => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState(savedName);
  const [pointingScale, setPointingScale] = useState('fibonacci');

  const onRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const onPointingScaleChange = (event) => {
    setPointingScale(event.target.value);
  };

  const onUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const createRoom = async () => {
    const room = await fetch('/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: roomName,
        pointingScale,
      }),
    }).then((resp) => resp.json());

    setRoom(room);

    socket.emit('join', room.code, userName);

    try {
      localStorage.setItem('nickname', userName);
    } catch(e){}
  };

  return (
    <div>
      <h3>
        Create a Session
      </h3>
      <input
        value={userName}
        className={inputStyles.input}
        type="text"
        placeholder="Your Nickname"
        onChange={onUserNameInput}
      ></input>
      <br />
      <input
        className={inputStyles.input}
        type="text"
        placeholder="Session Name"
        onChange={onRoomNameChange}
      ></input>
      <br />
      <p>
        Pointing Scale:
      </p>
      <select
        className={inputStyles.input}
        value={pointingScale}
        onChange={onPointingScaleChange}
      >
        <option value="fibonacci">Fibonacci (0,1,2,3,5,8,13)</option>
        <option value="integer">Simple Integer (1,2,3,4,5)</option>
        <option value="tshirt">T-Shirt Sizes (XS,S,M,L,XL,XXL)</option>
      </select>
      <br />
      <br />
      <button
        className={buttonStyles.button}
        onClick={createRoom}
      >
        Create Session
      </button>
      <br />
      <button
        className={buttonStyles.clearButton}
        onClick={cancelCreating}
      >
        Join a Session Instead
      </button>
    </div>
  );
};

CreateRoom.propTypes = {
  setRoom: PropTypes.function,
  socket: PropTypes.any,
  cancelCreating: PropTypes.function,
};
