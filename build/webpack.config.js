var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name]-[hash].js" 
  },
  devtool: 'eval-source-map',
  plugins : [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: 'true'
  })
  ]
} 