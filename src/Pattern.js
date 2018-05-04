import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Match from './Match';
import { shallowMatch } from './matchers';

export default class Pattern extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isMatch: PropTypes.func,
    match: PropTypes.object.isRequired,
    first: PropTypes.bool,
  };

  static defaultProps = {
    isMatch: shallowMatch,
    first: false,
  };

  render() {
    const { children, match, first, isMatch } = this.props;
    const matched = Children.toArray(children).filter(child => {
      if (child.type === Match) {
        return isMatch(match, child.props);
      }
      return true;
    });

    // If we don't have to worry about rendering the first match, just render
    // the entire matched array.
    if (!first) {
      return matched;
    }

    // Otherwise, we need to filter out every instance of Match besides the
    // first one, and then render the array of children.
    let found = false;
    return matched.filter(child => {
      if (child.type === Match) {
        if (found) {
          return false;
        }
        found = true;
        return true;
      }
      return true;
    });
  }
}
