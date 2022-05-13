const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const { getCommitHash } = require('./utils');

module.exports = {
  bail: true,
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
        exclude: [/node_modules/],
        include: [
          path.resolve(__dirname, '../ssr'),
          path.resolve(__dirname, '../src'),
        ],
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: Infinity,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
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
  plugins: [new DefinePlugin({ GIT_COMMIT_HASH: getCommitHash() })],
  resolve: {
    cacheWithContext: false,
    extensions: ['web.js', '.mjs', '.js', '.json', '.jsx', 'web.jsx'],
    modules: ['node_modules'],
  },
};
