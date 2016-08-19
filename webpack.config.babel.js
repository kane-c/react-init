const path = require('path');

const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const webpack = require('webpack');

let manifest;

if (process.env.BUILDING_DLL || process.env.NODE_ENV !== 'development') {
  manifest = [];
} else {
  try {
    manifest = require('./build/manifest.json'); // eslint-disable-line max-len, global-require, import/no-unresolved
  } catch (ex) {
    process.stderr.write('Could not load DLL manifest. ' +
                         'Did you `npm run build:dll`?\n');
    process.exit(1);
  }
}

const config = {
  cache: process.env.NODE_ENV === 'development',
  entry: [
    'babel-polyfill',
    './src/client.jsx',
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
        test: /\.css$/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(?:eot|gif|jpe?g|otf|png|svg|ttf|woff2?)(\?[a-z0-9=#&.]+)?$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
  output: {
    filename: 'client.js',
    path: path.resolve('./build/static'),
    publicPath: '/static/',
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
    config.module.loaders[2].loader = ExtractTextPlugin.extract({
      fallbackLoader: 'style',
      loader: 'css',
    });
    config.plugins.push(new ExtractTextPlugin('[name].css'));
  } else {
    config.entry.unshift(
      'eventsource-polyfill', // IE polyfill
      'webpack-hot-middleware/client'
    );

    // loaders[1] = our app's css
    config.module.loaders[1].loader = `style!${cssLoader}`;
    config.module.loaders[2].loader = 'style!css';

    config.plugins.push(new webpack.DllReferencePlugin({
      context: '.',
      manifest,
    }));
  }

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else if (process.env.NODE_ENV === 'test') {
  config.externals = {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  };
  // Null CSS loader
  config.module.loaders[1].loader = 'null-loader';

  config.node = {
    fs: 'empty',
    net: 'empty',
  };

  // `.json` is required for `chai-enzyme`
  config.resolve.extensions.push('.json');
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
  config.module.loaders[2].loader = ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: `css?${JSON.stringify({ discardComments: { removeAll: true } })}`,
  });
  config.plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = config;
