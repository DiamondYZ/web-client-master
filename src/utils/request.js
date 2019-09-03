import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
// import { getToken, getOwner, getUserID } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import JSONbig from 'json-bigint'
import {i18n} from '@/lang/i18n-setup'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间
  transformResponse: [(data) => {
    // 对 data 进行任意转换处理
    return JSONbig({storeAsString: true}).parse(data)
  }]
})

const proxyService = {
  post (serviceBase, url, params) {
    let p = {
      cmd: url,
      parameters: params,
      userToken: getToken()
    }
    return service.post(serviceBase, p)
  },
  get (url) {
    return service.get(url)
    // return Promise.reject(new Error('Get method is not supported.'))
  },
  delete () {
    return Promise.reject(new Error('Delete method is not supported.'))
  },
  put () {
    return Promise.reject(new Error('Put method is not supported.'))
  }
}

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
// if (store.getters.token) {
//  config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//  config.headers['userID'] = getUserID()
//  config.headers['owner'] = getOwner()
// }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * 通过response自定义status来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    */
    const data = response.data
    const res = response.data.response
    if ((data.statusCode && data.statusCode !== 200) || (data.status && data.status !== 200)) {
      if (data.statusCode === 403) {
        MessageBox.confirm(i18n.t('server.sessionTimeOut'), i18n.t('server.confirmLogout'), {
          confirmButtonText: i18n.t('server.relogin'),
          cancelButtonText: i18n.t('server.cancel'),
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        let message
        if (data.error) {
          message = data.error.errorInfo
        } else if (data.statusCode) {
          message = i18n.t('server.' + data.statusCode)
        } else {
          message = i18n.t('server.500')
        }
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(data)
    } else {
      if (res.status !== 200) {
        Message({
          message: i18n.t('server.' + res.status),
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(data.response)
      } else {
        return data.response
      }
    }
  },
  error => {
    console.log('err: ' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default proxyService
