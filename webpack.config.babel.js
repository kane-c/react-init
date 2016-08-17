const path = require('path');

const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const webpack = require('webpack');

let manifest;

if (process.env.BUILDING_DLL || process.env.NODE_ENV !== 'development') {
  manifest = [];
} else {
  manifest = require('./build/manifest.json'); // eslint-disable-line max-len, global-require
}

const config = {
  cache: process.env.NODE_ENV === 'development',
  entry: [
    'babel-polyfill',
    './client.jsx',
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: process.env.NODE_ENV === 'development',
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
        test: /\.jsx?$/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
      },
      {
        include: /node_modules/,
        loaders: ['style', 'css'],
        test: /\.css$/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
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
  postcss: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 8'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval-source-map';

  const cssLoader = 'css?modules&importLoaders=1&sourceMap&' +
    'localIdentName=[local]__[path][name]__[hash:base64:5]!postcss';

  if (process.env.APP_ENV === 'server') {
    /* eslint-disable global-require */
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    /* eslint-enable global-require */

    config.module.loaders[1].loader = ExtractTextPlugin.extract({
      fallbackLoader: 'style',
      loader: cssLoader,
    });
    config.plugins.push(new ExtractTextPlugin('static/[name].css'));
  } else {
    config.entry.unshift(
      'eventsource-polyfill', // IE polyfill
      'webpack-hot-middleware/client'
    );

    // loaders[1] = our app's css
    config.module.loaders[1].loader = `style!${cssLoader}`;

    config.plugins.push(new webpack.DllReferencePlugin({
      context: '.',
      manifest,
    }));
    config.profile = true;
  }

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else if (process.env.NODE_ENV === 'production') {
  // Production performance optimizations
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      sourceMap: false,
    })
  );

  // CSS
  /* eslint-disable global-require */
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  /* eslint-enable global-require */

  config.module.loaders[1].loader = ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: 'css?modules&-autoprefixer&importLoaders=1!postcss',
  });
  config.plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = config;
