// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseConfig = require('./webpack.base.ts')
// import baseConfig from './webpack.base.ts'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { merge } = require('webpack-merge')

const pathRoot = require('path')

const portFinder = require('portfinder')

const devConfig = {
  mode: 'development',
  devServer: {
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    static: {
      directory: pathRoot.join(__dirname, '../public'),
    },
    historyApiFallback: true,

    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
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

// export default runDev
