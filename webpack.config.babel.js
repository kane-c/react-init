const path = require('path');

const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  entry: [
    'babel-polyfill',
    './client.jsx',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        env: {
          development: {
            presets: [
              'react-hmre',
            ],
            plugins: [
              [
                'react-transform', {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: [
                      'react',
                    ],
                    locals: [
                      'module',
                    ],
                  }],
                },
              ],
            ],
          },
        },
      },
    }],
  },
  output: {
    filename: 'client.js',
    path: path.resolve('./build/static'),
    publicPath: '/static',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.entry.unshift(
    'eventsource-polyfill', // IE polyfill
    'webpack-hot-middleware/client'
  );

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    sourceMap: false,
  }));
}

module.exports = config;
