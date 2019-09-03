import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    headerbar: {
      opened: !+Cookies.get('headerbarStatus')
    },
    language: Cookies.get('language') || 'zh'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_HEADERBAR: state => {
      if (state.headerbar.opened) {
        Cookies.set('headerbarStatus', 1)
      } else {
        Cookies.set('headerbarStatus', 0)
      }
      state.headerbar.opened = !state.headerbar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    toggleHeaderbar ({ commit }) {
      commit('TOGGLE_HEADERBAR')
    },
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
