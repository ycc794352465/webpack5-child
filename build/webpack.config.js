const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const address = require('address');

const { name } = require("../package");

const isProd = process.env.NODE_ENV === 'production'
const prodPlugins = []
if (isProd) {
  prodPlugins.push(new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }))
}
console.log(__dirname, 1212121)
const devServer = {
  port: 10002,
  historyApiFallback: true, // 处理 路由history模式
  open: false,
  onListening: function (devServer) {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }
    const port = devServer.server.address().port;
    return ('http://localhost:', port);
  },
  headers:{'Access-Control-Allow-Origin': '*'}
}
module.exports = {
  target: 'web',
  entry: {
    app: './src/main.js'
  },
  output: {
    clean: isProd,
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: `${name}-[name]`,
    libraryTarget: "umd", // 把微应用打包成 umd 库格式
    chunkLoadingGlobal: `webpackJsonp_${name}`,
    publicPath: '/',
  },
  devServer: {
    // contentBase: './dist',
    ...devServer
  },
  stats: 'errors-only',  // 处理只能在errors状态下展示运行日志
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`蛙人你好，系统正运行在:

        - Local: http://localhost:${devServer.port}
        - Network: http://${address.ip()}:${devServer.port}
      
      No issues found.`],
        // notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true,
    }),
    ...prodPlugins
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              /node_modules[\\\/]core-js/,
              /node_modules[\\\/]webpack[\\\/]buildin/,
            ],
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3
            }]]
          }
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.s[ac]ss$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader', 'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-scss',//此处配置scss解析器
                plugins: [
                  'postcss-preset-env'
                ],
              },
            },
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false, // 是否压缩代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  }
}