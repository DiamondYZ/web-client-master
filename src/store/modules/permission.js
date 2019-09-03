import {constantRouterMap} from '@/router'
import asyncComponentMap from '@/views/asyncComponentMap'
import Layout from '@/views/layout/Layout'

// menus 嵌套最多3层
function convertMenusToRouters (menus) {
  let routers = []
  menus.forEach((m, i) => {
    parseMenu(m, routers)
  })
  // menus.push({
  //   id: 999,
  //   path: '/theme-manage',
  //   code: 'ThemeManage',
  //   title: '主题管理',
  //   label: '主题管理',
  //   icon: 'wis_gerengongzuotai',
  //   children: []
  // })
  routers.push({ path: '*', redirect: '/404', hidden: true })
  return routers
}

function parseMenu (menu, routers) {
  if (menu.children.length === 0) {
    let r = {
      path: menu.path,
      component: Layout,
      children: [{
        path: '',
        component: asyncComponentMap[menu.code],
        name: menu.code,
        meta: {
          title: menu.title
        }
      }]
    }
    routers.push(r)
  } else {
    menu.children.forEach((item) => {
      parseMenu(item, routers)
    })
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menus: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    generateRoutes ({commit}, menus) {
      return new Promise(resolve => {
        let accessedRouters = convertMenusToRouters(menus)
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_MENUS', menus)
        resolve()
      })
    }
  }
}

export default permission
