import router from './router'
import { getToken } from '@/utils/auth'
import store from './store'
import {fetchMenus} from '@/api/menu'
import {Message} from 'element-ui'

const whiteList = ['/login', '/authredirect']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/index'})
    } else {
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完menu信息
        fetchMenus().then((data) => {
          store.dispatch('generateRoutes', data.result).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})
