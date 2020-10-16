import {
    setHtml
} from '@js/test.js'

const node = document.querySelector('#app')

node.innerHTML = 'hello world'

setTimeout(function () {
    setHtml(node, 'test')

}, 1000)