# module

module是用来配置webpack如果处理模块的，

## loader

module.rules 配置模块的读取和解析规则，通常是用来配置loader，其类型是一个数组，数组中的每一项都配置了webpack该如何处理对应的文件，配置一项rules大致经过以下几个过程

1. 条件匹配。通过 test、include、exclude这三个配置项来命中符合规则的模块
2. 应用规则。通过use选项来配置处理这些模块的loader，可以是单个loader，也可以是多个loader，多个loader的执行顺序是从右向左执行。
3. 执行顺序。rule项的执行顺序是从右到左的，当然可以通过一个叫enfore的属性来改变当前项的执行顺序

    ```
    enfore: post  //执行顺序放到最后
    enfore: pre   //执行顺序放到最前面
    ```


## noParse

noParse选项会帮助webpack忽略哪些没有经过模块处理的文件的递归解析和处理，例如JQuery等，这样有助于提高webpack的构建性能。

noParse是个可选配置，类型是 RegExp、[RegExp]、function。例如，如果想要忽略JQuery，可以

```
{
    ...
    noParse: /JQuery/
    ...
}
// 或者
{
    ...
    noParse: function(content){
        return /JQuery/.test(content)
    }
    ...
}
```
## parser

webpack是以模块化的Javascript的文件为入口，所以内置了对模块化Javascript的解析，支持AMD、CommonJS、ES6等模块化。parser配置了webpack要解析哪些模块化语法，哪些不要解析，对比noParse，parser具有更细的颗粒度性，noParse只是配置了哪些文件不解析，而parser是配置了哪些语法不解析。

```
module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        parser: {
            amd: false, //禁用AMD
            commonjs: false, //禁用 commonjs
            system: false, //禁用 systemjs
            harmony: false, //禁用 ES6  import/export
            requireInclude: false, // 禁用 require.include
            requireEnsure: false, // 禁用 require.ensure
            requireContext: false, // 禁用 require.context
            browserify: false, // 禁用 browserify
            requireJs: false, // 禁用 requirejs
        }
    }]
}
```
# 一些问题

## loader的执行顺序以及为什么

## AMD CommonJs ES6模块化区别
