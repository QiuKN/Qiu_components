/**
 * @file 图片放大预览模块 / ES module
 * @module components/duumask
 */

 import duumask from './mask'

 duumask.install = function(Vue) {
     Vue.component(duumask.name, duumask)
 }

 export default duumask