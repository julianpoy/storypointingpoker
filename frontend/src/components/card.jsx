import PropTypes from 'prop-types';

export const Card = ({ value, highlighted, onClick }) => (
  <div onClick={onClick}>
    {value}
    Is highlighted: {highlighted}
  </div>
);

Card.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  highlighted: PropTypes.boolean,
  onClick: PropTypes.function,
};
