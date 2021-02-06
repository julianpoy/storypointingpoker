import PropTypes from 'prop-types';

export const Game = ({ room, socket }) => (
  <div>
    Session Code: {room.code}
    <br />
    {socket.clientId}
    Game
  </div>
);

Game.propTypes = {
  room: PropTypes.any,
  socket: PropTypes.any,
};
