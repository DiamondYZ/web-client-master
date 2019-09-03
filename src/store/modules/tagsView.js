const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) {
        return
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache && view.name) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index = state.visitedViews.findIndex(v => v.path === view.path)
      if (index > -1) {
        state.visitedViews.splice(index, 1)
      }

      let cIndex = state.cachedViews.findIndex(name => name === view.name)
      if (cIndex > -1) {
        state.cachedViews.splice(cIndex, 1)
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      let index = state.visitedviews.findIndex(v => v.path === view.path)
      if (index > -1) {
        state.visitedViews = state.visitedViews.slice(index, index + 1)
      }

      let cIndex = state.cachedViews.findIndex(name => name === view.name)
      if (cIndex > -1) {
        state.cachedViews = state.cachedViews.slice(cIndex, cIndex + 1)
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedViews ({commit}, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews ({commit, state}, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews ({commit, state}, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews ({commit, state}) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
