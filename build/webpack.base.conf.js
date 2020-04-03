const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
      index: "./src/index.js",
      index1: "./src/index1.js"
  },
  output: {
    filename: "js/[name]/[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: 'index.html',
      chunks: ['index', 'commons'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index1.html',
      template: 'index1.html',
      chunks: ['index1', 'commons'],
    }),
  ]
};
