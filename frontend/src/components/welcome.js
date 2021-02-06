import PropTypes from 'prop-types';
import { useState } from 'preact/hooks';

import { CreateRoom } from './createRoom';

export const Welcome = ({ setRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [showCreating, setShowCreating] = useState(false);

  const joinRoom = async () => {
    const room = await fetch(`/rooms/${roomCode}`, {
      method: 'GET',
    }).then((resp) => resp.json());

    setRoom(room);
  };

  const onRoomCodeInput = (event) => {
    setRoomCode(event.target.value);
  };

  if (showCreating) return <CreateRoom setRoom={setRoom} />;

  return (
    <div>
      <button onClick={setShowCreating(true)}>Create a New Session</button>
      or
      <input type="text" placeholder="Session Code" onChange={onRoomCodeInput}></input>
      <button onClick={joinRoom}>Join a Session</button>
    </div>
  );
};

Welcome.propTypes = {
  setRoom: PropTypes.function,
};
