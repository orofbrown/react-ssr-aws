const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

/** @TODO - exclude unwanted files from bundle */

const common = require('./common.config');

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';

const plugins = isProd
  ? []
  : [new HotModuleReplacementPlugin(), new CleanWebpackPlugin()];

module.exports = merge(common, {
  devtool: isProd ? undefined : 'inline-source-map',
  entry: [
    path.resolve(__dirname, '../src/index.js'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=false&noInfo=false',
    'react-hot-loader/patch',
  ],
  mode,
  name: 'client',
  output: {
    // chunkFilename: 'static/js/[name].chunk.[contenthash].js',
    chunkFilename: 'static/js/[name].chunk.js',
    // filename: 'static/js/[name].bundle.chunk.[contenthash].js',
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
    },
    ...(isProd && {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            output: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      sideEffects: true,
    }),
  },
  performance: isProd && {
    hints: 'warning',
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: 'static/css/[name].chunk.[contenthash].css',
      filename: 'static/css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../build'),
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
    ...plugins,
  ],
  resolve: {
    fallback: {
      child_process: false,
      dgram: false,
      fs: false,
      net: false,
      tls: false,
    },
  },
  stats: 'normal',
  target: 'web',
});
