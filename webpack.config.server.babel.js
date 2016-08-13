const path = require('path');

const config = require('./webpack.config.babel');

config.entry[1] = './index.jsx';
config.output.filename = 'server.js';
config.output.path = path.resolve('./build');
config.target = 'node';

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const nodeExternals = require('webpack-node-externals');
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  config.externals = [nodeExternals()];
}

module.exports = config;
