const path = require('path');
const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./webpack.common.js');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new ReactRefreshWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: ['swc-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    hot: true,
    liveReload: false,
    open: true,
    compress: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    static: {
      directory: path.resolve(__dirname, 'static/'),
      publicPath: '/',
    },
    proxy: {
      context: ['/api/**', 'static/**'],
      target: 'http://localhost:5002/',
      secure: false,
    },
  },
};

module.exports = merge(common, dev);
