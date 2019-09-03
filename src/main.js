import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VDragged from 'v-dragged'
import Vuebar from 'vuebar'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import {i18n} from '@/lang/i18n-setup'
import './icons' // icon
import './permission' // permission control
import './mock' // simulation data generator

import * as filters from './filters' // global filter

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Element, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VDragged)
Vue.use(Vuebar)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
