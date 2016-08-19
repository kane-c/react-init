const config = require('./webpack.config.babel');

config.entry[1] = './src/index.jsx';
config.output.filename = '../server.js';
config.target = 'node';

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  const nodeExternals = require('webpack-node-externals');
  /* eslint-enable global-require */
  config.externals = [nodeExternals({
    // Do not bundle vendor CSS - we won't have webpack to load them
    whitelist: [
      /bootstrap/,
      /font-awesome/,
    ],
  })];
}

module.exports = config;
