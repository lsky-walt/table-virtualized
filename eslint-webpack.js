const base = require('./webpack/webpack.base.config')

module.exports = {
  resolve: {
    alias: base.resolve.alias,
    extensions: base.resolve.extensions,
  },
}
