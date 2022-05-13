/** @note - needed for DEV ONLY */

const path = require('path');
const { optimize } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./common.config');

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const renderer = isProd ? '../ssr/render.js' : '../ssr/renderMiddleware.js';

module.exports = merge(common, {
  devtool: isProd ? undefined : 'source-map',
  entry: [path.resolve(__dirname, renderer)],
  mode,
  name: 'server',
  output: {
    filename: 'main.js',
    /** @todo - this causes an error in dev serve mode */
    library: {
      type: 'commonjs2',
    },
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [new optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
  target: 'node',
});
