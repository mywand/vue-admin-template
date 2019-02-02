import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/404', '/login', '/member/callback', '/member/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    store.getters.mgr.getUser().then((user) => {
      if (user == null) {
        store.getters.mgr.signinRedirect()
        NProgress.done()
      } else {
        if (to.path === '/login') {
          next({ path: '/' })
          NProgress.done()
        } else {
          store.dispatch('GetInfoOidc').then(res => {
            next()
          }).catch((err) => {
            store.dispatch('LogOutOidc').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
        }
      }
    }).catch((err) => {
      Message.error(err || 'Verification failed, please login again')
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        store.getters.mgr.signoutRedirect()
        NProgress.done()
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
