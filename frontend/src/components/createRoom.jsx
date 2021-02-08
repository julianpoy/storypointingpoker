import PropTypes from 'prop-types';
import { useState } from 'preact/hooks';

export const CreateRoom = ({ setRoom }) => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const onRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const [pointingScale, setPointingScale] = useState('fibonacci');
  const onPointingScaleChange = (event) => {
    setPointingScale(event.target.value);
  };

  const createRoom = async () => {
    const room = await fetch('/rooms', {
      method: 'POST',
      data: JSON.stringify({
        name: roomName,
        pointingScale,
        userName: userName
      }),
    }).then((resp) => resp.json());

    setRoom(room);
  };

  const onUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="UserName" onChange={onUserNameInput}></input>
      <input type="text" placeholder="Session Name" onChange={onRoomNameChange}></input>
      Pointing Scale:
      <select
        value={pointingScale}
        onChange={onPointingScaleChange}
      >
        <option value="fibonacci">Fibonacci (0,1,2,3,5,8,13)</option>
        <option value="integer">Simple Integer (1,2,3,4,5)</option>
        <option value="tshirt">T-Shirt Sizes (XS,S,M,L,XL,XXL)</option>
      </select>
      <button onClick={createRoom}>Create Session</button>
    </div>
  );
};

CreateRoom.propTypes = {
  setRoom: PropTypes.function,
};
