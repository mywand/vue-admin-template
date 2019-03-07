import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import { sitemaps } from './menu'
// import { myrouters } from './menu.1'
/* eslint-disable */


export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  beforeEach: (to, from, next) => {
    console.log('to:' + to + 'from:' + from + 'next:' + next)
  },
  routes: sitemaps
})
