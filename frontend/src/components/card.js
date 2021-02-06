import PropTypes from 'prop-types';

export const Card = ({ number }) => (
  <div>
    {number}
  </div>
);

Card.propTypes = {
  number: PropTypes.number,
};
