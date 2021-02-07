import PropTypes from 'prop-types';
import { useState } from 'preact/hooks';

import { CARD_SETS, CARD_SETS_FORMAL_NAME } from '../utils/cardSets.js';

export const CreateRoom = ({ setRoom }) => {
  const [roomName, setRoomName] = useState('');
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
      }),
    }).then((resp) => resp.json());

    setRoom(room);
  };

  return (
    <div>
      <input type="text" placeholder="Session Name" onChange={onRoomNameChange}></input>
      Pointing Scale:
      <select
        value={pointingScale}
        onChange={onPointingScaleChange}
      >
        {Object.entries(CARD_SETS).map(([name, values]) => (
          <option value={name}>{CARD_SETS_FORMAL_NAME[name]} ({values.join(',')})</option>
        ))}
      </select>
      <button onClick={createRoom}>Create Session</button>
    </div>
  );
};

CreateRoom.propTypes = {
  setRoom: PropTypes.function,
};
