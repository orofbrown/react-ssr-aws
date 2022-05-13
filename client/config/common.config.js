const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  bail: true,
  resolve: {
    cacheWithContext: false,
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(bmp|gif|ico|jpe?g|png|svg)$/,
        type: 'asset/resource',
        parser: {
          dataUriCondition: {
            maxSize: 1000,
          },
        },
      },
      {
        exclude: [/[/\\\\]node_modules[/\\\\]/],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'server'),
        ],
        test: /\.js$/,
        // use: [
        //   {
        //     loader: 'thread-loader',
        //     options: {
        //       poolTimeout: Infinity,
        //     },
        //   },
        //   {
        //     loader: 'babel-loader',
        //   },
        // ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(e|m)jsx?$/,
        type: 'javascript/auto',
      },
    ],
  },
  // plugins: [
  // new DefinePlugin({ GIT_COMMIT_HASH: '' })
  // ],
};
