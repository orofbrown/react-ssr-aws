const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const common = require('./common.config');

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';

const plugins = isProd
  ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ]
  : [new HotModuleReplacementPlugin(), new CleanWebpackPlugin()];

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode,
  name: 'client',
  output: {
    // chunkFilename: 'static/js/[name].chunk.[contenthash].js',
    chunkFilename: 'static/js/[name].chunk.js',
    clean: true,
    // filename: 'static/js/[name].bundle.chunk.[contenthash].js',
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
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
    // new DefinePlugin({ GIT_COMMIT_HASH: '' })
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       to: 'build',
    //     },
    //   ],
    // }),
    ...plugins,
    new MiniCssExtractPlugin({
      chunkFilename: 'static/css/[name].chunk.[contenthash].css',
      filename: 'static/css/[name].css',
    }),
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
  target: 'web',
});
