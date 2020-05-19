const state = {
  posts: [],
  onePost: null,
  comments: [],
  totalPosts: 0,
  showMobileMenu: false
}

const mutations = {
  SET_POST: (state, post) => {
    state.onePost = post
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SET_TOTAL_POSTS: (state, totalPosts) => {
    state.totalPosts = totalPosts
  },
  SHOW_OR_HIDE_MOBILE_MENU: (state, boolean) => {
    state.showMobileMenu = boolean
  },
  SET_COMMENTS: (state, comments) => {
    state.comments = comments
  }
}

const actions = {
  async getPost ({ commit }, uid) {
    const post = await this.$axios.get(`${process.env.baseUrl}/api/articles/get/${uid}`)
    commit('SET_POST', post ? post.data.data : {})
  },
  setPosts ({ commit }, posts) {
    commit('SET_POSTS', posts ? posts.data.data : [])
    commit('SET_TOTAL_POSTS', posts.data.total[0]['COUNT(1)'] || 0)
  },
  setComments ({ commit }, comments) {
    commit('SET_COMMENTS', comments && comments.data ? comments.data.data : [])
  },
  async getPosts ({ app, dispatch }, ctx) {
    const start = ctx && ctx.start ? ctx.start : 0
    const perPage = ctx && ctx.perPage ? ctx.perPage : 6

    const posts = await this.$axios.get(`${process.env.baseUrl}/api/articles/get-all/${start}/${perPage}`)
    dispatch('setPosts', posts)
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
