import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { UserManager } from 'oidc-client'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    mgr: new UserManager({
      authority: 'https://localhost:5001', // ID_SVR
      client_id: 'a371885939cb4d1aa24640e8245807e8',
      redirect_uri: `http://localhost:9528/member/callback?`,
      response_type: 'id_token token',
      scope: 'openid profile api1',
      post_logout_redirect_uri: `http://localhost:9528/member/about`
    })
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfoOidc({ commit, state }) {
      state.mgr.getUser().then((user) => {
        console.log(user)
        // "Authorization", "Bearer " + user.access_token
        commit('SET_TOKEN', 'Bearer ' + user.access_token)
        const profile = user.profile
        commit('SET_NAME', profile.name)
        commit('SET_AVATAR', require(`@/assets/${profile.picture}`))
        // const data = user.profile
        // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //   commit('SET_ROLES', data.roles)
        // } else {
        //   reject('getInfo: roles must be a non-null array !')
        // }
      }).catch(error => {
        console.error(error)
      })
    },

    // 登出
    LogOutOidc({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        state.mgr.signoutRedirect()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
