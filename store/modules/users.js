const state = {
  loading: false,
  user: null,
  userTemp: null,
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
  userTemp: (state) => {
    return state.userTemp
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
  deleteUser ({ commit }, id) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete('/api/users/delete', { data: { id } }).then((res) => {
        commit('deleteUser', res.data.data.id)
        resolve(res.data)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  },
  saveUser ({ commit }, user) {
    commit('loading', true)
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/users/save', user).then((res) => {
        if (res.data.status === 'OK') {
          commit('saveUser', res.data.data)
        }
        resolve(res)
      }).catch(reject).finally(() => {
        commit('loading', false)
      })
    })
  },
  selectedUser ({ commit }, user) {
    return new Promise((resolve) => {
      commit('setUser', user)
      return resolve()
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
    state.user = user ? Object.assign({}, user) : null
    state.userTemp = Object.assign({}, state.user || {})
  },
  saveUser: (state, user) => {
    const findUser = state.users.find(u => u.id === user.id)
    if (findUser) {
      Object.assign(findUser, user)
    } else {
      state.users.push(user)
    }
  },
  deleteUser: (state, id) => {
    const index = state.users.findIndex(user => user.id === id)
    if (index !== -1) {
      state.users.splice(index, 1)
    }
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
