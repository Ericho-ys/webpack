#从头开始学习webpack
## 2020/10/14
### 什么是webpack？

webpack 是一个静态资源打包构建工具，能够帮助解决前端模块发开发的问题

### 对比其他打包工具，webpack优缺点是什么？

仅对比 gulp...

### 关于node.js中的一些全局变量和方法的解释

__dirname: 总是指向被执行 js 文件的绝对路径

path.resolve: 把一个路径或路径片段的序列解析为一个绝对路径,给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径

path.join: 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径

process.env: 返回一个包含用户环境信息的对象

### 配置文件参数解析

1. context: webpack的entry 入口上下文，是入口文件所处目录的绝对路径，默认情况下是在当前项目的根目录

```context: path.resolve(__dirname, "../")```

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。例如，该学习项目中entryoutput子项目，项目的根目录是 webpack_study,想要你将entryoutput打包构建，那么context就要设置为配置文件所在项目的路径 也就是
``` path.resolve(__dirname, '../src') ```
