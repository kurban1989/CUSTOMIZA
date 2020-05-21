const state = {
  casesForUser: null,
  cases: []
}

const mutations = {
  SET_CASES: (state, cases) => {
    state.cases = cases
  },
  SET_CASES_FOR_USER: (state, casesForUser) => {
    state.casesForUser = casesForUser
  }
}

const actions = {
  async getAll ({ commit }) {
    const cases = await this.$axios.post(`${process.env.baseUrl}/api/cases/get-all`)
    commit('SET_CASES', cases ? cases.data.data : [])
  },
  async get ({ commit }, ctx) {
    const start = ctx && ctx.start ? ctx.start : 0
    const perPage = ctx && ctx.perPage ? ctx.perPage : 6

    const cases = await this.$axios.post(`${process.env.baseUrl}/api/cases/get/${start}/${perPage}`)
    commit('SET_CASES_FOR_USER', cases ? cases.data.data : [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
