import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      total: state => state.directory.totalPosts,
      posts: state => state.directory.posts
    })
  },
  async asyncData ({ store, query, $axios }) {
    const perPage = 10
    const start = !query.page || Number(query.page) === 1 ? 0 : (query.page - 1) * perPage
    const currentPage = start > 0 ? query.page : 1
    const posts = await $axios.get(`api/articles/get-all/${start}/${perPage}`)
    store.dispatch('directory/setPosts', posts)

    return {
      currentPage,
      start,
      perPage
    }
  },
  methods: {
    enCode (b64Encoded) {
      try {
        return atob(b64Encoded)
      } catch (e) {
        return Buffer.from(b64Encoded, 'base64').toString()
      }
    },
    setPage (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
    }
  }
}
