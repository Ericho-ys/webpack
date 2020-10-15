const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path') //node path模块
const fs = require('fs') // node fs模块 文件

const pages = fs.readdirSync(path.resolve(__dirname, '../src')).filter(function (item) {
    return item.indexOf('page') !== -1
})
const entrys = {}
for (var i = 0; i < pages.length; i++) {
    entrys[pages[i]] = './' + pages[i] + '/js/index.js'
}
module.exports = {
    entry: entrys, //入口文件，webpack从该文件开始构建依赖图
    context: path.resolve(__dirname, '../src'), //context 是webpack的entry 入口上下文，是入口文件所处目录的绝对路径，默认情况下是在当前项目的根目录
    output: {
        filename: '[name]/bundle.js', // 打包后文件的名字
        path: path.resolve(__dirname, '../dist') // 输出文件的目录
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'page1/index.html',
            chunks: ['page1'],
            template: '../src/page1/index.html'
        }),
        new htmlWebpackPlugin({
            filename: 'page2/index.html',
            chunks: ['page2'],
            template: '../src/page2/index.html'
        })
    ]
}