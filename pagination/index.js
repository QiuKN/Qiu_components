/*
 * @Author: your name
 * @Date: 2020-08-27 10:23:35
 * @LastEditTime: 2020-08-27 10:40:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \pc-nuxt\components\global\pagination\index.js
 */
import Pagination from './pager';

/* istanbul ignore next */
Pagination.install = function(Vue) {
  Vue.component(Pagination.name, Pagination);
};

export default Pagination;
