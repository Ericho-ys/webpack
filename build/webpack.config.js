var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js" 
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