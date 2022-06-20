const path = require('path')

const rootPath = path.join(__dirname, '..', './packages')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebPack = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')

const baseWebpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(rootPath, '3d/src/index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // 每次打包之前 清空 dist目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@fly/util': path.join(rootPath, 'utils/src'),
      '@pages': path.join(rootPath, '3d/src'),
    },
    mainFiles: ['index', 'main'],
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
      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true,
      //         happyPackMode: true,
      //         configFile: path.join(__dirname, '..', './tsconfig.json'),
      //         experimentalWatchApi: true,
      //         // getCustomTransformers: path.join(__dirname, 'ts-transformers'),
      //         compilerOptions: {
      //           jsx: 'react-jsx',
      //         },
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
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
      // 这个是用来处理 组件按需加载样式的
      {
        test: /\.css$/i,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MinCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.scss'),
                // css moudule
                localIdentName: '[hash:base64:5]',
              },
              import: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, '..', './postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin(),
    new HtmlWebPack({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),

    new MinCssExtractPlugin({
      // 生产模式下 记得 加 hash 模式 有利于走浏览器缓存
      //  // using hash on dev mode is unfriendly on both building & hmr
      filename: '[name].css',
    }),
  ],
}

module.exports = baseWebpackConfig
