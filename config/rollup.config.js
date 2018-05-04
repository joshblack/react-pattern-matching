'use strict';

import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const babelConfig = {
  babelrc: false,
  presets: [['env', { modules: false }], 'stage-1', 'react'],
  plugins: ['external-helpers'],
  externalHelpers: true,
};

export default {
  name: 'react-pattern-matching',
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    file: path.resolve(__dirname, '../umd/react-pattern-matching.js'),
    format: 'umd',
  },
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  plugins: [
    nodeResolve({
      main: true,
      jsnext: true,
      next: true,
    }),
    babel(babelConfig),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'createElement',
        ],
      },
    }),
  ],
};
