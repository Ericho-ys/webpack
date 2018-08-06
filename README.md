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

```context: path.resolve(__dirname, "../")```

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

2. entry: 起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

如果不希望这里涉及到的路径和执行webpack命令时的具体路径相关，而是希望相对于配置文件的路径的话，就需要使用path模块：


```
var path = require('path')
module.exports = {
    entry: path.resolve(__dirname, './app.js'),
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'output-file.js'
    }
}

```




entry有三种形式：字符串，数组，对象

字符串跟数组都是对象形式的简化，对象是以key|value的形式。key可以是简单的字符串，对应output.filename,key还可以是路径字符串

此时webpack会自动生成路径目录，并将路径的最后作为[name]。这个特性在多页面配置下也是很有用的。

### 使用web-dev-server

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

参数： 

clientLogLevel： 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息,有none, error, warning 或者 info（默认值）。

historyApiFallback： 通过传入一个对象，比如使用 rewrites 这个选项,当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html

```
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }//可以做404页面的重定向
  ]
}

```
hot: 启用 webpack 的模块热替换特性 （true）

contentBase: 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先

注：vue脚手架的配置文件采用CopyWebpackPlugin插件

compress：一切服务都启用gzip 压缩（true）

host: 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下

port: 端口号

open : 服务打开浏览器（true）

overlay: 报错时，全屏展示错误信息

publicPath: 此路径下的打包文件可在浏览器中访问,与path的区别

    path：指定编译目录而已（/build/js/），不能用于html中的js引用
    publicPath：虚拟目录，自动指向path编译目录（/assets/ => /build/js/）。html中引用js文件时，必须引用此虚拟路径（但实际上引用的是内存中的文件，既不是/build/js/也不是/assets/）
    
quiet: 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。

### 使用plugins

plugins参数是一个数组，数组内容是一个个插件实例

webpack.DefinePlugin： 可以理解为，通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
比如，你通过下面的设置


```
new webpack.DefinePlugin({
    __DEV__: true
}),
```

```
// index.js
if (__DEV__){
    // 任意代码
    console.log(‘这个是我通过webpack配置的全局标识’)
}
```
webpack.HotModuleReplacementPlugin：模块热替换 

webpack.NamedModulesPlugin：当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。

HtmlWebpackPlugin： 简单创建 HTML 文件，用于服务器访问


```
new HtmlWebpackPlugin({
  filename: 'index.html',//文件名
  template: 'index.html',//模板路径
  inject: true//true和body会将js加载在body底部，head会加载到head标签
})
```

CopyWebpackPlugin：在webpack中拷贝文件和文件夹


```
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../static'),//来源文件夹
    to: config.dev.assetsSubDirectory,//目标文件夹
    ignore: ['.*']//忽略项
  }
])
```

UglifyJsPlugin： 压缩代码



