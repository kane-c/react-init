// Note: DLL is only used in development
const { join } = require('path');

const { DllPlugin } = require('webpack');

const config = require('./webpack.config.babel');

config.entry = [
  'babel-polyfill',
  'eventsource-polyfill', // IE polyfill
  'axios',
  'lodash', // Not used directly but keeps the bundle lean
  'react',
  'react-dom',
  'react-helmet',
  'react-proxy', // Not used directly but keeps the bundle lean
  'react-redux',
  'react-router',
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
