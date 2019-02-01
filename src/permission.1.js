import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/member/callback', '/member/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  debugger
  store.getters.mgr.getUser().then((user) => {
    if (user == null) {
      store.getters.mgr.signoutRedirect()
    } else {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        next()
      }
    }
  }).catch((err) => {
    Message.error(err || 'Verification failed, please login again')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.getters.mgr.signinRedirect()
      NProgress.done()
    }
    // store.getters.mgr.signoutRedirect()
    // next({ path: '/' })
  })
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
