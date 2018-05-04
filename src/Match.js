import React from 'react';
import PropTypes from 'prop-types';

const Match = ({ render, ...rest }) => render(rest);

Match.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Match;
