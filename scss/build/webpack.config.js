const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: '../src/js/index.js',
    output: {
        filename: 'js/[name]_bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: miniCssExtractPlugin.loader,
                    options: {
                        // 这里可以指定一个 publicPath
                        // 默认使用 webpackOptions.output中的publicPath
                        publicPath: '../'
                    },
                },
                'css-loader', 'sass-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: '../index.html',
            filename: '../dist/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}