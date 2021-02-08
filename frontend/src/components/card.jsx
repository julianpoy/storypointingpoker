import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './card.scss';

export const Card = ({ disabled, hidden, value, highlighted, onClick }) => {
  const className = cx(
    styles.container,
    {
      [styles.containerHighlighted]: highlighted,
    }
  );

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      ariaLabel={`Vote for ${value}`}
    >
      {hidden ? null : value}
    </button>
  );
};

Card.propTypes = {
  disabled: PropTypes.boolean,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  highlighted: PropTypes.boolean,
  onClick: PropTypes.function,
};
