import PropTypes from 'prop-types';

import { Card } from './card.jsx';

import styles from './voteList.scss';

export const VoteList = ({ members, hidden }) => (
    <div className={styles.container}>
      {members.map((member) => (
        <div className={styles.vote}>
          <Card
            value={member.vote}
            disabled={true}
            hidden={hidden}
          />
          {member.name}
        </div>
      ))}
    </div>
);

VoteList.propTypes = {
  members: PropTypes.any,
  hidden: PropTypes.boolean,
};
