const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: '../dist/index.html',
            template: '../index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist')
    }
}