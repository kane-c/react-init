import path from 'path';

import webpack from 'webpack';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  entry: [
    './client.js',
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "env": {
          "development": {
            "presets": [
              "react-hmre",
            ],
            "plugins": [
              [
                "react-transform", {
                  "transforms": [{
                      "transform": "react-transform-hmr",
                      "imports": [
                        "react",
                      ],
                      "locals": [
                        "module",
                      ],
                    },
                  ],
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
};

if (process.env.NODE_ENV === 'development') {
  config.entry.unshift(
    'eventsource-polyfill', // IE polyfill
    'webpack-hot-middleware/client'
  );

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
