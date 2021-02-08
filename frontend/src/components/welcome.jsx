import PropTypes from 'prop-types';
import { useState } from 'preact/hooks';
import { CreateRoom } from './createRoom.jsx';

export const Welcome = ({ setRoom, socket }) => {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [showCreating, setShowCreating] = useState(false);

  const joinRoom = async () => {
    const room = await fetch(`/rooms/${roomCode}`, {
      method: 'GET',
    }).then((resp) => resp.json());

    setRoom(room);
    socket.emit('join', roomCode, userName);
  };

  const onRoomCodeInput = (event) => {
    setRoomCode(event.target.value);
  };

  const onUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  if (showCreating) return <CreateRoom setRoom={setRoom} socket={socket} />;

  return (
    <div>
      <button onClick={() => setShowCreating(true)}>Create a New Session</button>
      or
      <input type="text" placeholder="UserName" onChange={onUserNameInput}></input>
      <input type="text" placeholder="Session Code" onChange={onRoomCodeInput}></input>
      <button onClick={joinRoom}>Join a Session</button>
    </div>
  );
};

Welcome.propTypes = {
  setRoom: PropTypes.function,
  socket: PropTypes.any
};
