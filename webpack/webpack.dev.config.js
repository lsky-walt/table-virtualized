const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')

module.exports = merge({}, {
  entry: {
    index: './site/index.jsx',
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[chunkhash].chunk.js',
    // publicPath: '/'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../site/index.ejs'),
      filename: path.resolve(__dirname, '../dist/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9090,
    // proxy: {
    //   '/api': {
    //     target: 'http://you-awesome.api',
    //     pathRewrite: { '^/api': '' },
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  },
},
base)
