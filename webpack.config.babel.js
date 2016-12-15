const path = require('path');

const cssnext = require('postcss-cssnext');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
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

const publicPath = '/';

const config = {
  cache: process.env.NODE_ENV === 'development',
  entry: [
    'babel-polyfill',
    './src/client.jsx',
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
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
        loader: 'json-loader',
      },
      {
        test: new RegExp('\\.(?:eot|gif|ico|jpe?g|otf|png|svg|ttf|woff2?)' +
                         '(\\?[a-z0-9=#&.]+)?$'),
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  output: {
    filename: 'client.js',
    path: path.resolve('./build/static'),
    publicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/', // For `css-loader`
        postcss: [
          postcssFlexbugsFixes,
          postcssFocus(),
          cssnext({
            browsers: ['last 2 versions', 'IE > 8'],
          }),
          postcssReporter({
            clearMessages: true,
          }),
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval-source-map';

  const cssLoader = 'css-loader?modules&importrules=1&sourceMap&' +
    'localIdentName=[local]--[path][name]--[sha256:hash:hex:7]' +
    '!postcss-loader';

  if (process.env.APP_ENV === 'server') {
    /* eslint-disable global-require */
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    /* eslint-enable global-require */

    config.module.rules[1].loader = ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: cssLoader,
    });
    config.module.rules[2].loader = ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader',
    });
    config.plugins.push(new ExtractTextPlugin('[name].css'));
  } else {
    config.entry.unshift(
      'eventsource-polyfill', // IE polyfill
      'webpack-hot-middleware/client' // eslint-disable-line comma-dangle
    );

    // rules[1] = our app's css
    config.module.rules[1].loader = `style-loader!${cssLoader}`;
    config.module.rules[2].loader = 'style-loader!css-loader';

    config.plugins.push(new webpack.DllReferencePlugin({
      context: '.',
      manifest,
    }));
  }

  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
} else if (process.env.NODE_ENV === 'test') {
  // Get a better traceback
  config.devtool = 'inline-source-map';

  // We don't need the bundle
  delete config.entry;

  config.externals = {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  };
  // Null CSS loader - we don't need CSS files during tests
  config.module.rules[1].loader = config.module.rules[2].loader =
    'null-loader';

  config.node = {
    fs: 'empty',
    net: 'empty',
  };

  // `.json` is required for `chai-enzyme`
  config.resolve.extensions.push('.json');
} else if (process.env.NODE_ENV === 'production') {
  // Production performance optimizations
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }) // eslint-disable-line comma-dangle
  );

  // CSS
  /* eslint-disable global-require */
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  /* eslint-enable global-require */

  config.module.rules[1].loader = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader?modules&-autoprefixer&importrules=1&' +
      'localIdentName=[sha256:hash:hex:7]!postcss-loader',
  });
  config.module.rules[2].loader = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: `css-loader?${JSON.stringify({
      discardComments: {
        removeAll: true,
      },
    })}`,
  });
  config.module.rules[4].loader =
    'file-loader?name=[name].[sha256:hash:hex:7].[ext]';
  config.plugins.push(
    new ExtractTextPlugin('[name].[sha256:contenthash:hex:7].css') // eslint-disable-line max-len, comma-dangle
  );

  config.output.filename = 'client.[chunkhash:7].js';

  if (process.env.APP_ENV !== 'server') {
    /* eslint-disable global-require */
    const AssetsPlugin = require('assets-webpack-plugin');
    /* eslint-enable global-require */

    config.plugins.push(new AssetsPlugin({
      filename: 'build/assets.json',
    }));
  }
}

module.exports = config;
