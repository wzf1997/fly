const baseConfig = require('./webpack.base')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { merge } = require('webpack-merge')

const devConfig = {
  mode: 'production',
}

module.exports = merge(devConfig, baseConfig)
