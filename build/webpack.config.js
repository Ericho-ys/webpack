var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const utils = require('./utils')
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  devtool: 'eval-source-map',
  plugins : [
    new CleanWebpackPlugin(['../dist']),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: 'true'
    })
    
  ]
} 