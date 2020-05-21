import { mapState } from 'vuex'
import { isClient } from '~/helpers'

export default {
  computed: {
    ...mapState({
      total: state => state.directory.totalPosts,
      posts: state => state.directory.posts
    })
  },
  // async beforeMount () {
  //   const perPage = 10
  //   const start = !this.$route.query.page || Number(this.$route.query.page) === 1 ? 0 : (this.$route.query.page - 1) * perPage
  //   this.currentPage = start > 0 ? this.$route.query.page : 1
  //   await this.$store.dispatch('directory/getPosts', { start, perPage })
  // },
  async asyncData ({ store, query, req }) {
    const perPage = 10
    const start = !query.page || Number(query.page) === 1 ? 0 : (query.page - 1) * perPage
    const currentPage = start > 0 ? query.page : 1
    // const posts = await $axios.get(`api/articles/get-all/${start}/${perPage}`)
    await store.dispatch('directory/getPosts', { start, perPage })

    return {
      currentPage,
      start,
      perPage,
      baseURL: isClient ? '' : req.headers.host
    }
  },
  data () {
    return {
      currentPage: 1
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
