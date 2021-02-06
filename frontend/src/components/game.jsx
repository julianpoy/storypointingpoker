import PropTypes from 'prop-types';

export const Game = ({ socket }) => (
  <div>
    {socket.clientId}
    Game
  </div>
);

Game.propTypes = {
  socket: PropTypes.any,
};
