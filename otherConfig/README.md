# 其他的一些配置

## devtool
devtool配置webpack如何生成source-map，配置为false时，则不生成sourece-map，想为构建出来的代码生成source-map可以这样配置：

```
devtool: 'source-map'
```
## extenals

extenals用来告诉webpack，要构建的代码中使用了那些不用被打包的模块，也就是说这些模块是外部提供的，webpack在打包时可以忽略它们。

有些时候Javascript的运行环境可能内置了一些全局变量或者模块。例如在html中引入了JQuery，全局变量JQuery就会被注入到网页的Javascript运行环境中。

如果想要在模块化的代码中使用JQeury。可能需要：

```
import $ from 'JQuery'
```

构建后你会发现在chunk中包含JQuery库中的内容，这样JQuery就出现了两次，此时使用extenals就可以保证，外部引入的模块不被webpack打包：

```
extenals:{
    jquery: 'JQuery'
}
```