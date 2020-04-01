import _ from 'loadsh'
import { print } from './print'
require('./common/common.css')
require('./index.scss')
// import './common/common.css'
// import './index.scss'
function component() {
    var element = document.createElement('div');
  
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'Ericho'], ' ');
    element.onclick = print('ok')
    return element;
  }
  
document.body.append(component());