const path = require('path')

const rootPath = path.join(__dirname, '..', './packages')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebPack = require('html-webpack-plugin')

const baseWebpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(rootPath, '3d/src/index.tsx'),
  output: {
    filename: 'bundle.js',
    clean: true, // 每次打包之前 清空 dist目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@fly/util': path.join(rootPath, 'utils/src'),
    },
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin(),
    new HtmlWebPack({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
}

export default baseWebpackConfig
