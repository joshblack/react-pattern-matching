import React from 'react';
import PropTypes from 'prop-types';

const Match = ({ children, render, ...rest }) => {
  if (render) {
    return render(rest);
  }

  if (children) {
    return children(rest);
  }

  return null;
};

Match.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
};

export default Match;
