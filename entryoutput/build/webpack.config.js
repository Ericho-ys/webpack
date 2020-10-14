
const path = require('path') //node path模块
module.exports = {
    entry: '/js/app.js', //入口文件，webpack从该文件开始构建依赖图
    context: path.resolve(__dirname, '../src'), //context 是webpack的entry 入口上下文，是入口文件所处目录的绝对路径，默认情况下是在当前项目的根目录
    output: {
        filename: 'bundle.js', // 打包后文件的名字
        path: path.resolve(__dirname, '../dist') // 输出文件的目录
    } 
}