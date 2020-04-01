const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const DefinePlugin = require('webpack/lib/DefinePlugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]  
    },
    plugins: [
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
        })
    ]
})
module.exports = webpackConfig