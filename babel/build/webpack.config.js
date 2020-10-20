const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    // context: path.resolve(__dirname, '../src'),
    entry: [path.resolve(__dirname, '../src/js/index.js')],
    output: {
        filename: 'js/[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: path.resolve(__dirname, 'node_modules'),
        }, ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../index.html'),
        })
    ]
}