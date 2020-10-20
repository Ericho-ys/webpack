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

## 配置方案及区别
配置的前提都是，安装了 @babel/core @babel/cli @babel/preset-env这几个包

### @babel/preset-env

基本语法的转换

```
{
  presets: [[
    "@babel/preset-env", {
      "modules": false //对ES6的模块化不做转化，以便用于 tree shaking、sideEffects等
    }
  ]],
  plugins: []
}
```
### 方案一  @babel/preset-env + @babel/polyfill

@babel/preset-env + @babel/polyfill 能够完成语法以及新API的转义。这是第一种方案。

@babel/polyfill是core-js库的别名，随着core-js@3的更新，@babel/polyfill已经无法从2过渡到3，所以@babel/polyfill已经被废弃。

.babelrc中无需配置@babel/polyfill，而是根据useBuildIns的配置来决定如何引入@babel/polyfill，在确定要引入@babel/polyfill时，需要指定下core-js的版本
```
{
  presets: [["@babel/preset-env", {
    "modules": false,
    "corejs": 2,
    "useBuildIns": 'entry'
  }]]
}
```

### 方案二 @babel/preset-env + @babel/plugin-transform-runtime

需要安装 @babel/plugin-transform-runtime 和 @babel/runtime-corejs2，同时，在配置中corejs的版本要指定为2，如果是corejs未设置或者设置的是 false，那么安装的包就不是@babel/runtime-corejs2 而是 @babel/runtime，此时只会对语法进行转义，不会对新的API进行转义，所以corejs要设置为 2。@babel/runtime-corejs2对比@babel/runtime来说，增加了对core-js这个库（新API的各种polyfill）的依赖。

```
{
  presets: [["@babel/preset-env", {
    modules: false
  }]],
  plugins: [["@babel/plugin-transform-runtime", {
    "corejs": 2
  }]]
}
```

## 两种方案的区别和场景

首先要明确的是ES新语法的转义是通过@babel/preset-env完成的，所以这两种方案都需要@babel/preset-env，它们的主要区别就是API的转义有些不一样。

- @babel/polyfill存在全局污染问题
- @babel/transform-runtime + @babel/runtime-corejs2不存在全局污染问题，可按需导入，但是检测不到```'abc'.includes('a') ```这种写法。

所以，两种方案都可行，只是使用场景不一样

- 如果不是开发库 可以使用@babel/preset-env + @babel/polyfill 的方案，根据自己的需求配置 useBuildIns选项
- 如果是开发库，可以使用@babel/preset-env + @babel/plugin-transform-runtime + @babel/runtime-corejs3




 

