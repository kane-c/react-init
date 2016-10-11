const path = require('path');

const argv = require('minimist')(process.argv.slice(2));

const webpackConfig = require('./webpack.config.babel');

module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['jsdom'],
    client: {
      mocha: {
        grep: argv.grep,
      },
    },
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'lcovonly', subdir: '.' },
        { type: 'html', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    files: [
      {
        pattern: 'tests.js',
        watched: false,
        served: true,
        included: true,
      },
    ],
    frameworks: ['mocha'],
    logLevel: config.LOG_WARN,
    preprocessors: {
      'tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['coverage', 'mocha'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
