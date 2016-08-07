import path from 'path';

module.exports = {
  entry: './client.js',
  output: {
    path: 'build/static',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};
