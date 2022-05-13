/** @note - needed for DEV ONLY */

const path = require('path');
const { optimize } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./common.config');

const mode = process.env.NODE_ENV;

module.exports = merge(common, {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../ssr/renderMiddleware.js')],
  mode,
  name: 'server',
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../build'),
    publicPath: '',
  },
  plugins: [new optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
  target: 'node',
});
