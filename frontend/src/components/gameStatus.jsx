import PropTypes from 'prop-types';

export const GameStatus = ({ roomCode }) => (
  <div>
    Session Code: {roomCode}
  </div>
);

GameStatus.propTypes = {
  roomCode: PropTypes.string,
};
