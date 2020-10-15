# Entry

entry 是配置模块的入口，Webpack执行构建的第一步就是从入口开始递归寻找所有依赖，构建项目的依赖图。

## context

Webpack在寻找相对路径的文件时。会以context为根目录，context默认为执行启动Webpack时所在的项目目录。context是绝对路径

##  Entry类型

类型 | 例子 | 含义
---|--- | ---
string | '../src/js/app.js' | 入口模块的文件路径，可以是相对路径
array | ['../src/js/app.js', '../src/js/app2.js'] | 入口模块的文件路径，可以是相对路径，只有最后一项的模块会被导出
Object | { a:'../src/js/app.js', b: ['../src/js/app.js', '../src/js/app2.js']} | 配置多个入口，每个入口生成一个chunk 


## chunk名称

webpack会为每个生成的chunk定义一个名称

- 如果entry 是一个字符串或者是一个数组，此时只会生成一个chunk，名称为main
- 如果entry 是一个对象，会生成多个chunk，此时每个chunk的名称就是对象中键值对的键值

## 配置动态entry

如果项目中有很多页面，每个页面都需要配置一个入口，但是这些页面随着迭代增加，entry就不能写成静态，此时就可以用一个函数返回entry的配置,例如这个例子，通过nodejs的文件系统读取src中的pages文件，生成entry

```
const fs = require('fs') // node fs模块 文件

const pages = fs.readdirSync(path.resolve(__dirname, '../src')).filter(function (item) {
    return item.indexOf('page') !== -1
})
const entrys = {}
for (var i = 0; i < pages.length; i++) {
    entrys[pages[i]] = './' + pages[i] + '/js/index.js'
}
```
配置好entry和output后，通过html-webpack-plugin配置多入口的html模板

```
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
```
htmlWebpackPlugin 中有个chunk参数，该参数的作用是决定哪些chunk会被插入到html中，如果不配置的话，webpack默认会把所有入口生成的chunk插入html页面中

# output

output用来配置如何输出最终的代码，它是一个对象，里面包含很多配置

## filename

filename用来配置最终输出文件的名称，为string类型。如果只有一个输出文件，就可以把它写成静态不变：

```
filename: 'bundle.js'
```
但是如果有多个输出文件，就要借助模板和变量。webpack会给每个chunk取一个name，那么就可以用这个name来区分输出的文件

```
output: {
    filename: '[name].js'
}
```

还有其他的一些

变量名 | 含义
---|---
id | chunk的唯一标识
name | chunk的名字
hash | chunk唯一标识的hash
chunkhash | chunk内容的hash

其中hash的长度是可控的 [hash:8]

## path

配置chunk文件最终输出的目录，通常需要通过node的path模块的resolve方法生成决定路径

```
output: {
    path: path.resolve(__dirname, '../dist')
}
```

## chunkFilename

配置没有入口文件的chunk在输出的文件名字，chunkFilename用于在运行时生成的chunk在输出时文件的名字。常见的有在使用commonChunkPlugin

## publicPath

在复杂的项目中，有一些构建出的资源需要异步加载，加载这些资源需要对应的url地址，比如说通常项目中的静态资源可以放在cdn上，来加快响应速度，此时publicPath就要配置为cdn地址。
```
output: {
    filename: '[name]_[chunkhash].js'
    publicPath: 'https://cdn.example.com/assets/'
}
```
打包出来就是

```
<script src="https://cdn.example.com/assets/a_12345678.js"></script>
```