const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: './js/index.js',
    output: {
        filename: 'js/[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: '../dist/index.html',
            template: '../index.html'
        })
    ],
}