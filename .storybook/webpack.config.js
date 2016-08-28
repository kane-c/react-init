module.exports = {
  module: {
    loaders: [
      // Handle CSS and static assets
      {
        exclude: /node_modules/,
        loader: 'style!css?modules&importLoaders=1&sourceMap&' +
                'localIdentName=[local]--[path][name]--[sha256:hash:hex:7]' +
                '!postcss',
        test: /\.css$/,
      },
      {
        include: /node_modules/,
        loader: 'style!css',
        test: /\.css$/,
      },
      {
        test: /\.(?:eot|gif|jpe?g|otf|png|svg|ttf|woff2?)(\?[a-z0-9=#&.]+)?$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    // Allow importing JSX
    extensions: ['', '.js', '.jsx'],
  },
};
