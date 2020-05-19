<template>
  <div>
    <div class="header-art">
      <mobile-menu :menu-list="list" />
      <header class="header container">
        <navbar class="mb-4" />
      </header>
    </div>

    <div class="container pt-4 brdr-bottom-1">
      <h1 class="post--h1">
        {{ post.title | capitalize }}
      </h1>
      <hr>

      <div class="post__meta mb-2">
        <time class="time" :datetime="new Date(post.date).toLocaleDateString($i18n.locale, optionDate)">
          {{ new Date(post.date).toLocaleDateString($i18n.locale, optionDate) }}
        </time>

        <div class="post__stats">
          <div class="post__stats--item">
            <svg id="eye" viewBox="0 0 42 24"><path d="M21 0c13.776 0 21 10.357 21 12s-7.224 12-21 12-21-10.357-21-12 7.224-12 21-12zm0 21.232c5.156 0 9.334-4.133 9.334-9.232s-4.179-9.232-9.334-9.232c-5.155 0-9.335 4.133-9.335 9.232s4.179 9.232 9.335 9.232zm0-9.232c-.053 1.096 4.116 2.523 3.3 3.352-1.774 1.803-4.691 1.763-6.513-.088s-1.861-4.813-.087-6.616 4.691-1.763 6.513.088c.984 1-3.15 1.973-3.213 3.264z" /></svg>
            <span>{{ post.view }}</span>
          </div>
        </div>
      </div>

      <div class="post__body">
        <div v-html="deCodeFull(post.text)" />
      </div>
      <hr>
      <comments :id="post.id" :uid="post.uid" :count="post.count_comments" />
    </div>
    <footer-site />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '~/components/header/Navbar'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'
import FooterSite from '~/components/FooterSite'
import comments from '~/components/blocks/components/comments.vue'
import casesMixin from '~/mixins/cases'
import { isClient, isEmpty } from '~/helpers'

export default {
  name: 'PreviewArticles',
  components: {
    MobileMenu,
    FooterSite,
    comments,
    Navbar
  },
  mixins: [casesMixin],
  data () {
    return {
      optionDate: {
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      list: mainMenu,
      heightImages: []
    }
  },
  computed: {
    ...mapState({
      post: state => state.directory.onePost
    }),
    titlePage () {
      return this.post && !isEmpty(this.post) ? this.post.title : ''
    }
  },
  async asyncData ({ store, params, redirect, $axios, req }) {
    if (params.uid) {
      await store.dispatch('directory/getPost', params.uid)
      const comments = await $axios.get(`${process.env.baseUrl}/api/comments/get/${params.uid}`)
      store.dispatch('directory/setComments', comments)

      return {
        baseURL: isClient ? '' : req.headers.host
      }
    } else {
      redirect('/articles/articles')
    }
  },
  head () {
    const canonical = this.baseURL + this.$route.fullPath

    return {
      title: this.titlePage,
      meta: [
        { name: 'description', hid: 'description', content: this.titlePage },
        // Open Graph
        { property: 'og:locale', content: this.$i18n.locale + '_' + this.$i18n.locale.toUpperCase() },
        { property: 'og:site_name', content: 'Customiza' },
        { property: 'og:title', content: this.titlePage },
        { property: 'og:description', content: this.titlePage },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.baseURL },
        { property: 'og:image', content: this.baseURL + '/img/logo.svg' }
      ],
      link: [{
        rel: 'canonical',
        href: canonical
      }]
    }
  },
  mounted () {
    if (isClient) {
      this.updateView(this.post.id)
      this.setImgBlockHeight()
      window.addEventListener('resize', this.setImgBlockHeight)
    }
  },
  beforeDestroy () {
    if (isClient) {
      window.removeEventListener('resize', this.setImgBlockHeight)
    }
  },
  methods: {
    updateView (id) {
      this.$axios.post('/api/articles/update-views', { id })
    }
  }
}
</script>
<style lang="scss" scoped>
.brdr-bottom-1 {
  border-color: #e5e5e5;
}
</style>
