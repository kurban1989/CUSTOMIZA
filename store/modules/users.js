const state = {
  loading: false,
  user: null,
  users: null,
  statuses: null
}

const getters = {
  loading: (state) => {
    return state.loading
  },
  user: (state) => {
    return state.user
  },
  users: (state) => {
    return state.users
  },
  statuses: (state) => {
    return state.statuses
  },
  roles: (state) => {
    return state.roles
  }
}

const actions = {
  getUser ({ commit }, id) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/users/get/' + id).then((res) => {
        commit('setUser', res.data.data)
        resolve(res.data)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  },
  getUsers ({ commit }) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/users/get').then((res) => {
        commit('setUsers', res.data.data)
        resolve(res.data)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  },
  getStatuses ({ commit }) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/users/statuses/get').then((res) => {
        commit('setStatuses', res.data.data)
        resolve(res.data)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  },
  getRoles ({ commit }) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/users/roles/get').then((res) => {
        commit('setRoles', res.data.data)
        resolve(res.data)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  }
}

const mutations = {
  loading: (state, boolean) => {
    state.loading = boolean
  },
  setUser: (state, user) => {
    state.user = user
  },
  setUsers: (state, users) => {
    state.users = users
  },
  setStatuses: (state, statuses) => {
    state.statuses = statuses
  },
  setRoles: (state, roles) => {
    state.roles = roles
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
