const baseConfig = require('./webpack.base')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { merge } = require('webpack-merge')

const portFinder = require('portfinder')

const devConfig = {
  mode: 'development',
  cache: true,
  devServer: {
    historyApiFallback: true,
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
    // 默认打开浏览器
    open: true,
  },
}

async function runDev() {
  try {
    const port = await portFinder.getPortPromise()
    devConfig.devServer.port = port
    return merge(devConfig, baseConfig)
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = runDev
