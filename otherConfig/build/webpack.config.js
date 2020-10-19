const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: './js/index.js',
    output: {
        filename: 'js/[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    externals: {
        jquery: 'jQuery'
    },
    devtool: 'source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: '../index.html',
            filename: '../dist/index.html',
            inject: 'body',
        })
    ]
}