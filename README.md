#从头开始学习webpack
## 2018/8/1
### package.json中script脚本的编写

--config: 使用某一份配置来进行打包，后面通常跟配置文件路径

--watch: 监听变动并自动打包

-p: 压缩混淆脚本

-d: 生成map映射文件，告诉哪些模块最终被打包到哪里去了

--progress: 显示进度条

注：package.json中的main字段要删除，并且加上"private": true, 

### 关于node.js中的一些全局变量和方法的解释

__dirname: 总是指向被执行 js 文件的绝对路径

path.resolve: 把一个路径或路径片段的序列解析为一个绝对路径,给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径

path.join: 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径

process.env: 返回一个包含用户环境信息的对象

### 配置文件参数解析

1. context: 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader

`context: path.resolve(__dirname, "../")`

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

2. entry: 起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

如果不希望这里涉及到的路径和执行webpack命令时的具体路径相关，而是希望相对于配置文件的路径的话，就需要使用path模块：

`var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './app.js'),
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'output-file.js'
    }
}`

