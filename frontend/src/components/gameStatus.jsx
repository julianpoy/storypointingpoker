import PropTypes from 'prop-types';

import styles from './gameStatus.scss';

export const GameStatus = ({ roomCode, name }) => (
  <div className={styles.container}>
    Session Code: <b>{roomCode}</b><br />
    Your Nickname: {name}
  </div>
);

GameStatus.propTypes = {
  roomCode: PropTypes.string,
};
