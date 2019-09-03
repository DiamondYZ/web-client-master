import {login, logout, loginWithVerifyKey} from '@/api/member'
import { getToken, setToken, removeToken, getOwner, setOwner, removeOwner, getUserID, setUserID, removeUserID } from '@/utils/auth'

const member = {
  state: {
    memberCode: '',
    sourceSystem: '',
    memberName: '',
    memberType: '',
    compCode: '',
    token: getToken(),
    owner: getOwner(),
    userID: getUserID(),
    avata: ''
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OWNER: (state, owner) => {
      state.owner = owner
    },
    SET_USERID: (state, userID) => {
      state.userID = userID
    },
    SET_NAME: (state, name) => {
      state.memberName = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 会员登录
    Login ({commit}, memberInfo) {
      const memberName = memberInfo.name.trim()
      return new Promise((resolve, reject) => {
        if (memberInfo.verifyKey) {
          loginWithVerifyKey(memberName, memberInfo.pass, memberInfo.owner, memberInfo.verifyKey, memberInfo.verifyValue)
            .then((data) => {
              const result = data.result
              commit('SET_TOKEN', result.token)
              commit('SET_USERID', result.userID)
              commit('SET_OWNER', result.owner)
              setToken(result.token)
              setOwner(result.owner)
              setUserID(result.userID)
              resolve()
            }).catch(err => {
              reject(err)
            })
        } else {
          login(memberName, memberInfo.pass, memberInfo.owner)
            .then((data) => {
              const result = data.result
              commit('SET_TOKEN', result.token)
              commit('SET_USERID', result.userID)
              commit('SET_OWNER', result.owner)
              setToken(result.token)
              setOwner(result.owner)
              setUserID(result.userID)
              resolve()
            }).catch(err => {
              reject(err)
            })
        }
      })
    },
    // 登出
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((data) => {
          commit('SET_TOKEN', '')
          commit('SET_USERID', '')
          commit('SET_OWNER', '')
          removeToken()
          removeUserID()
          removeOwner()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 前端登出
    FedLogOut ({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_OWNER', '')
        removeToken()
        removeUserID()
        removeOwner()
        resolve()
      })
    }
  }
}
export default member
