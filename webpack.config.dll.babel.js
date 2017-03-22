// Note: DLL is only used in development
const { join } = require('path');

const { DllPlugin } = require('webpack');

const config = require('./webpack.config.babel');

// Note: `react-proxy` cannot be in the DLL as it is required for hot reloading

config.entry = [
  'babel-polyfill',
  'eventsource-polyfill', // IE polyfill
  'axios',
  'buffer', // Not used directly but keeps the bundle lean
  'html-entities', // // Not used directly but keeps the bundle lean
  'immutable',
  'lodash', // Not used directly but keeps the bundle lean
  'react',
  'react-bootstrap',
  'react-dom',
  'react-helmet',
  'react-redux',
  'react-router',
  'react-router-dom',
  'react-router-redux',
  'redux',
  'redux-immutable',
  'redux-saga',
  'reselect',
];

config.output.filename = 'dll.js';
config.output.library = '[name]';
config.plugins = [
  new DllPlugin({
    name: '[name]',
    path: join(__dirname, 'build', 'manifest.json'),
  }),
];

module.exports = config;
