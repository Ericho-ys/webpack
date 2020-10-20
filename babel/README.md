# Babel

Babel 是一个Javascript编辑器，能够将你的代码编译为ES5，并提供一些垫片库（polyfill）来是的如今流行的浏览器支持一些新的特性。

## @babel/core

Babel的核心库所有核心API都在这个库中主要是 transform的一些同异步方法，用来转换生成code source-map 以及AST

## @babel/cli

用来使用babel命令

## .babelrc

这是babel的配置文件，内容是一个json，主要包含presets和plugins

```
{
    presets: [],
    plugins: []
}
```

## @babel/preset-env

Babel 推荐使用@babel/preset-env去完成转义的工作，里面包含各种可能需要的转义工具。之前以年份为准的preset已经废弃，现在统一用这个总包。同时Babel已经放弃开发"stage-"系列的包，以后转义组件只会放在这个总包中。

@babel/preset-env支持一些参数配置哪些feature要转义，哪些不要转义，其中比较重要的是target和useBuildIns

### target

指定目标环境

```
"targets": {
    "chrome": "58",
    "ie": "11"
  }

```

### useBuildIns 

是Babel7新增的配置，这个属性决定是否引入polyfill，也就是垫片库，用来转义新增一些API，它有三个可选值：

- false 即不引入垫片库，或者说Babel的编译结果不引入，把引入的位置，引入了那些垫片库交给用户来处理。因为我们的页面中引入了大量的js，在每个js文件中引入垫片库，这样会导致文件庞大，不可取。
- usage 在项目中无需手动引入垫片库，babel会将代码中已经用到的并且浏览器支持的垫片库导入。但是检测不到原型链上的句法使用，例如 ``` 'abc'.includes('h')```
- entry 需要在js代码的第一行主动引入polyfill，相对 false，只引入一次，体积上有所减小，但是还是很大，可以检测到原型链上的一些方法使用。

日常使用usage就够了，包体还小，需在写代码时使用新API需注意。
