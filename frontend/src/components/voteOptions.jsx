import PropTypes from 'prop-types';

import { Card } from './card.jsx';
import { CARD_SETS, CARD_SETS_FORMAL_NAME } from '../utils/cardSets.js';

import styles from './voteOptions.scss';

export const VoteOptions = ({ socket, room }) => {
  const castVote = (value) => {
    socket.emit('vote', room.code, value);
  };

  const me = room.members.find(member => member.ioClientId === socket.id);

  if (!room || !me) return;

  return (
    <div className={styles.container}>
      {CARD_SETS[room.pointingScale].map(value => (
        <Card
          highlighted={me.vote === value}
          value={value}
          onClick={() => castVote(value)}
        />
      ))}
      <div className={styles.instructions}>
        Click a card to cast your vote
      </div>
    </div>
  );
};

VoteOptions.propTypes = {
  socket: PropTypes.any,
  room: PropTypes.any,
};
