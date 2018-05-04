import isEqual from 'lodash.isequal';
import pick from 'lodash.pick';

export const shallowMatch = (target, props) => {
  for (let key in target) {
    if (target[key] !== props[key]) {
      return false;
    }
  }
  return true;
};

export const deepMatch = (target, props) => {
  return isEqual(target, pick(props, Object.keys(target)));
};

export const truthyMatcher = (target, props) => {
  for (let key in target) {
    if (target[key] !== !!props[key]) {
      return false;
    }
  }
  return true;
};
