
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const path = require('path')

module.exports = merge({}, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    // proxy: {
      //   '/api': {
      //     target: 'http://you-awesome.api',
      //     pathRewrite: { '^/api': '' },
      //     secure: false,
      //     changeOrigin: true,
      //   },
      // },
  }
},
base
)