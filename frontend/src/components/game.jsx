import PropTypes from 'prop-types';
import { GameStatus } from './gameStatus.jsx';
import { Card } from './card.jsx';

const ROOM_STATES = {
  START: 'start',
  SHOW: 'show',
};

export const Game = ({ room, socket }) => {
  return (
    <div>
      <GameStatus roomCode={room.code} />
      <div>
        {room.state === ROOM_STATES.START ? (
          <button>Reveal Votes</button>
        ): null}
        {room.state === ROOM_STATES.SHOW ? (
          <button>Reset Table</button>
        ): null}
      </div>

      {room.members.map(member => (
        <div>
          <Card number={member.vote} />
          {member.name}
        </div>
      ))}
    </div>
  );
};

Game.propTypes = {
  room: PropTypes.any,
  socket: PropTypes.any,
};
