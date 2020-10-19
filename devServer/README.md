# webpack-dev-server
--watch 监听本地文件的变化，有变化后重新构建
--hot 开启热更新功能，代码变化后无需重新加载网页，就能更新 
--inline webpack实时预览的功能是依赖于一个注入到页面的代理客户端去接受来自devServer的命令和负责刷新网页的工作。inline用于配置是否自动注入这个代理客户端到chunk中。默认是自动注入的


## 安装

webpack-cli@4 的版本 与 webpack-dev-server的最新版本3.11.0有兼容性问题，需卸载4.0版本，安装3.3.12版本

## historyApiFallback

historyApiFallback 用于配置 使用了HTML5 historyAPI的单页应用。这类单页应用要求服务器在针对任何命中的一个路由都返回一个html页面。例如在访问 ``` http://localhost:8080/user ```，和访问``` http://localhost:8080/home ```，都返回index.html，浏览器端会解析url，显示对应的页面。

配置historyApiFallback最简单的办法就是 

```
historyApiFallback: true

```
这会导致，任何请求都会返回index.html，这只能用于一个单页应用。如果是由多个单页应用组成，配置如下：

```
historyApiFallback:{
    rewirtes: {
        {from: /^\/user/, to: '/user.html'},
        {from: /^\/game/, to: '/game.html'},
        {from: /./, to: '/index.html'}
    }
}
```

## contentBase

contentBase用来配置devServer的http服务器的文件根目录，默认情况下为当前执行目录，
