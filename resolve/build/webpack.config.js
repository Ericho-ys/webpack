const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: './js/index.js',
    output: {
        filename: '[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, '../src/js')
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: '../dist/index.html',
            template: '../index.html'
        })
    ]
}