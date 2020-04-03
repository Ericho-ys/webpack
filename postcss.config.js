module.exports = {
    plugins: {
        "postcss-cssnext": {},
        "postcss-write-svg": {
            utf8: false
        },
        "postcss-px-to-viewport": {
            viewportWidth: 750, //设计稿宽度
            viewportHeight: 1334, //设计稿高度
            unitPrecision: 3, // px to vw 无法整除时，保留的小数单位
            viewportUnit: 'vw', //转化为vw单位
            selectorBlackList: ['.ingore', '.hairlines'], //不转化的类名
            minPixelValue: 1, //小于1px 不转化
            mediaQuery: false, // 允许媒体查询时转化
            exclude: /(\/|\\)(node_modules)(\/|\\)/ //不转化第三方包
        },
        "cssnano": {
            "cssnano-preset-advanced": {
                zindex: false,
                autoprefixer: false
            }
        }
    }   
  }