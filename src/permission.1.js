import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/member/callback','/member/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // TODO 
  if (getToken()) {
  if (store.getters.mgr.getUser()) {
    debugger
    if (to.path === '/login' || to.path === '/member/callback') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      store.getters.mgr.getUser().then((user) => {
        next()
        // xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        Message.error(user.access_token)
      }).catch((err) => {
        Message.error(err || 'Verification failed, please login again')
        store.getters.mgr.signoutRedirect()
        next({ path: '/' })
      })
      // if (store.getters.roles.length === 0) {
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch((err) => {
      //     store.getters.mgr.signoutRedirect()
      //     debugger
      //     // store.dispatch('FedLogOut').then(() => {
      //     Message.error(err || 'Verification failed, please login again')
      //     next({ path: '/' })
      //     // })
      //   })
      // } else {
      //   next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      store.getters.mgr.signinRedirect()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
