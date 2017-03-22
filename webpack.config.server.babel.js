const config = require('./webpack.config.babel');

config.entry[config.entry.length - 1] = './src/index.jsx';
config.output.filename = '../server.js';
config.target = 'node';

// Don't emit static files during the server build; only during the client
// build. This prevents writing the assets twice.
// Unless in development mode, where the client build is only made in memory
if (process.env.NODE_ENV === 'production') {
  config.module.rules[4].loader += '&emitFile=false';
}

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
