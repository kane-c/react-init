const path = require('path');

const cssnext = require('postcss-cssnext');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const webpack = require('webpack');

let manifest;

if (process.env.BUILDING_DLL || process.env.NODE_ENV !== 'development') {
  manifest = {};
} else {
  try {
    // eslint-disable-next-line global-require, import/no-unresolved
    manifest = require('./build/manifest.json');
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
        test: new RegExp('\\.(?:eot|gif|ico|jpe?g|otf|png|svg|ttf|woff2?)' +
                         '(\\?[a-z0-9=#&.]+)?$'),
        loader: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.ico$/,
        loader: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
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
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
};

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[sha256:hash:hex:7]',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        postcssFlexbugsFixes,
        postcssFocus(),
        cssnext(),
        postcssReporter({
          clearAllMessages: true,
        }),
      ],
    },
  },
];

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval-source-map';

  // css-loader
  cssLoaders[0].options.localIdentName =
    `[local]--${cssLoaders[0].options.localIdentName}`;
  cssLoaders[0].options.sourceMap = true;
  // postcss-loader
  cssLoaders[1].options.sourceMap = 'inline';

  if (process.env.APP_ENV === 'server') {
    // eslint-disable-next-line global-require
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    // rules[1] = our app's CSS, rules[2] = vendor's CSS
    config.module.rules[1].loader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: cssLoaders,
    });
    config.module.rules[2].loader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    });
    config.plugins.push(new ExtractTextPlugin('[name].css'));
  } else {
    config.entry.splice(1, 0,
      'eventsource-polyfill', // IE polyfill
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
    );

    // rules[1] = our app's CSS, rules[2] = vendor's CSS
    config.module.rules[1].loader = [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      ...cssLoaders,
    ];
    config.module.rules[2].loader = ['style-loader', 'css-loader'];

    config.plugins.push(new webpack.DllReferencePlugin({
      context: '.',
      manifest,
    }));
  }

  config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );
} else if (process.env.NODE_ENV === 'production') {
  // Production performance optimizations
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  );

  // CSS
  // eslint-disable-next-line global-require
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  config.module.rules[1].loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: cssLoaders,
  });
  config.module.rules[2].loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
      loader: 'css-loader',
      options: {
        discardComments: {
          removeAll: true,
        },
      },
    },
  });
  config.module.rules[3].loader = {
    loader: 'file-loader',
    options: {
      name: '[name].[sha256:hash:hex:7].[ext]',
    },
  };
  config.plugins.push(
    new ExtractTextPlugin('[name].[sha256:contenthash:hex:7].css'),
  );

  config.output.filename = 'client.[chunkhash:7].js';

  if (process.env.APP_ENV !== 'server') {
    /* eslint-disable global-require */
    const AssetsPlugin = require('assets-webpack-plugin');
    const OfflinePlugin = require('offline-plugin');
    /* eslint-enable global-require */

    config.plugins.push(new AssetsPlugin({
      filename: 'build/assets.json',
    }));

    config.plugins.push(new OfflinePlugin({
      caches: 'all',
      externals: [
        '/',
      ],
      AppCache: {
        events: true,
        FALLBACK: {
          '/': '/',
        },
      },
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
      },
      publicPath,
    }));
  }
}

module.exports = config;
