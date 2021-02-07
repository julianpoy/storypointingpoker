import PropTypes from 'prop-types';

import { CARD_SETS, CARD_SETS_FORMAL_NAME } from '../utils/cardSets.js';

export const VoteOptions = ({ socket, room }) => {
  const castVote = (value) => {
    socket.emit('vote', room.code, value);
  };

  const me = room.members.find(member => member.ioClientId === socket.id);

  if (!room || !me) return;

  return (
    <div>
      {CARD_SETS[room.pointingScale].map(value => (
        <Card
          highlighted={me.vote === value}
          value={value}
          onClick={() => castVote(value)}
        />
      ))}
    </div>
  );
};

VoteOptions.propTypes = {
  socket: PropTypes.any,
  room: PropTypes.any,
};
