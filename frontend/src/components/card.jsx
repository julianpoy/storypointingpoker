import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './card.scss';

export const Card = ({
  disabled, hidden, value, highlighted, onClick,
}) => {
  const className = cx(
    styles.container,
    {
      [styles.clickable]: !disabled,
      [styles.inactive]: !value,
      [styles.containerHighlighted]: highlighted,
    },
  );

  let content = value;
  if (hidden && value) {
    content = (
      <span className={styles.checkmark}>&#10003;</span>
    );
  } else if (hidden) content = '';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      ariaLabel={`Vote for ${value}`}
    >
      {content}
    </button>
  );
};

Card.propTypes = {
  disabled: PropTypes.boolean,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  highlighted: PropTypes.boolean,
  onClick: PropTypes.function,
};
