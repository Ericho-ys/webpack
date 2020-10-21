const path = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: '../src/ts/index.ts',
    output: {
        filename: 'js/[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['ts-loader'],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: '../index.html',
            filename: '../dist/index.html'
        })
    ]
}