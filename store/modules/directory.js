const state = {
  posts: [],
  showMobileMenu: false
}

const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SHOW_OR_HIDE_MOBILE_MENU: (state, boolean) => {
    state.showMobileMenu = boolean
  }
}

const actions = {
  async getPosts ({ commit }) {
    const posts = await this.$axios.$get('https://jsonplaceholder.typicode.com/users/1/posts')
    commit('SET_POSTS', posts)
  },
  switchMobileMenu ({ commit }, boolean) {
    commit('SHOW_OR_HIDE_MOBILE_MENU', boolean)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
