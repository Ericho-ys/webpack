const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const DefinePlugin = require('webpack/lib/DefinePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }, 'sass-loader']
        }
      ]  
    },
    plugins: [
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name]/[name].[hash].css',
        }),
        // new OptimizeCssAssetsPlugin({
        //   assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        //   cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
        //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
        //   canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        // })
    ],
    optimization: {
      splitChunks: {
          cacheGroups: {
              //打包公共模块
              commons: {
                  chunks: 'initial', //initial表示提取入口文件的公共部分
                  minChunks: 2, //表示提取公共部分最少的文件数
                  minSize: 0, //表示提取公共部分最小的大小
                  name: 'commons' //提取出来的文件命名
              }
          }
      }
    }
})
module.exports = webpackConfig