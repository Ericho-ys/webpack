# resolve

resolve用来配置webpack如何寻找模块对应的文件。webpack内部预置了Javascript模块化语法的解析功能，默认会采用约定好的规则去寻找，但是也可以通过resolve来修改规则

## alias 

alias选项是一个对象，该选项可以通过别名的设置来把原来的导入路径映射成一个新的路径

```
resolve: {
    alias: {
        'component': './src/component'
    }
}
```
可以通过 ``` import button from 'component/button' ```导入时，实际上alias被等价替换成 ``` import buttom from './src/component/button' ```

以上alias配置的作用就是 把 ``` component ``` 关键字 替换为 ```./src/component```

这样做会命中很多导入语句，可以通过以'$'符号结尾来缩小命中范围，只命中以关键字结尾的导入语句：

```
resolve:{
  alias:{
    'react$': '/path/to/react.min.js'
  }
}
```

## mainFields

有一些第三方模块会针对不同的环境提供几份代码，例如分别用 ES5，ES6的2分代码，这两份代码的位置会写在package.json文件里

```
{
    "jsnext:main": "es/index.js", // 采用ES6编写的代码入口文件
    "main": "lib/index.js" // 采用ES5编写的代码入口文件
}
```

webpack会根据 mainFields的配置去决定优先采用哪份代码，mainFields的默认配置如下：

```
mainFields: ['browser', 'main']

```

如果想优先采用ES6代码，可以这样配置

```
mainFields: ['jsnext:main','browser', 'main']
```

## extensions

在导入语句没有带后缀名时，webpack会自动带上后缀名去尝试访问文件是否存在。默认是

```
extensions: ['.js', '.json']
```
通常建议关闭，导入时必须带上后缀名，提高查找效率

## modules

用来配置 webpack从哪些目录开始寻找第三方模块。默认只会从'node_modules'中寻找。有时候你的项目有一些模块被大量引入，由于其他模块的位置分布不定，针对不同的文件需要计算不同的导入路径，这时，你可以利用该选项进行优化。假如你的模块在 ```./src/components ```下，extensions可以这样配置：

```
extensions: ['./src/components', 'node_modules']
```
此时，你在导入的时候就可以 ``` import button ```

## enforceExtension

该选项用来配置，在导入的时候是否需要带上文件后缀名，为true的时候需要带上

## enforeModuleExtension

该选项跟enforceExtension很类似，只是它是作用于 node_modules 下的模块的。enforceModuleExtension 通常搭配 enforceExtension 使用，在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。