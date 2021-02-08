import { useEffect } from 'preact/hooks';
import PropTypes from 'prop-types';

import { GameStatus } from './gameStatus.jsx';
import { VoteOptions } from './voteOptions.jsx';
import { VoteList } from './voteList.jsx';
import { Card } from './card.jsx';

import buttonStyles from '../sharedCss/button.scss';
import styles from './game.scss';

const ROOM_STATES = {
  START: 'start',
  SHOW: 'show',
};

export const Game = ({ room, socket }) => {
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const launchRoomCode = urlParams.get('sessionCode');
      if (!launchRoomCode) window.history.pushState(null, '', `${window.location.origin}/?sessionCode=${room.code}`);
    } catch (e) {}
  }, [room.code]);

  const revealVotes = () => {
    socket.emit('show', room.code);
  };

  const resetTable = () => {
    socket.emit('reset', room.code);
  };

  const me = room.members.find((member) => member.ioClientId === socket.io.engine.id);

  if (!room || !me) {
    return (
    <>
      Not connected to the room.
    </>
    );
  }

  return (
    <>
      <GameStatus roomCode={room.code} name={me.name} />
      <div className={styles.table}>
        {room.state === ROOM_STATES.START ? (
          <button className={buttonStyles.button} onClick={revealVotes}>Reveal Votes</button>
        ) : null}
        {room.state === ROOM_STATES.SHOW ? (
          <button className={buttonStyles.button} onClick={resetTable}>Reset Table</button>
        ) : null}
      </div>

      <br />

      <p>
        Votes:
      </p>
      <VoteList members={room.members} hidden={room.state !== ROOM_STATES.SHOW} />

      {room.state === ROOM_STATES.START ? (
        <VoteOptions socket={socket} room={room} />
      ) : null}
    </>
  );
};

Game.propTypes = {
  room: PropTypes.any,
  socket: PropTypes.any,
};
