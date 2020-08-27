const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const base = require('./webpack.base.config')

module.exports = merge({}, {
  entry: {
    index: './src/index.jsx',
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../lib/'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.', '.js', '.jsx', '.json'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
},
base)
