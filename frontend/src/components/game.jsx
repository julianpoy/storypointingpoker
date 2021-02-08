import PropTypes from 'prop-types';
import { GameStatus } from './gameStatus.jsx';
import { VoteOptions } from './voteOptions.jsx';
import { Card } from './card.jsx';

const ROOM_STATES = {
  START: 'start',
  SHOW: 'show',
};

export const Game = ({ room, socket }) => {
  const revealVotes = () => {
    socket.emit('show', room.code);
  };

  const resetTable = () => {
    socket.emit('reset', room.code);
  };

  const me = room.members.find(member => member.ioClientId === socket.id);

  console.log(room, socket)

  if (!room || !me) return (
    <>
      Not connected to the room.
    </>
  );

  return (
    <>
      <GameStatus roomCode={room.code} />
      <div>
        {room.state === ROOM_STATES.START ? (
          <button onClick={revealVotes}>Reveal Votes</button>
        ): null}
        {room.state === ROOM_STATES.SHOW ? (
          <button onClick={resetTable}>Reset Table</button>
        ): null}
      </div>

      Votes:
      {room.members.map(member => (
        <div>
          <Card
            value={member.vote}
            disabled={true}
            hidden={room.state === ROOM_STATES.START}
          />
          {member.name}
        </div>
      ))}

      {room.state === ROOM_STATES.START ? (
        <>
          Cast Your Vote:
          <VoteOptions socket={socket} room={room} />
        </>
      ) : null}
    </>
  );
};

Game.propTypes = {
  room: PropTypes.any,
  socket: PropTypes.any,
};
