import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import member from './modules/member'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'
import customReport from './modules/customReport'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    member,
    customReport
  },
  getters
})

export default store
