<template>
  <div>
    <HeaderForPages :menu-list="list" />
    <div v-if="post" class="container pt-4 brdr-bottom-1">
      <h1 class="post--h1">
        {{ post.short_title | htmldecode | capitalize }}
      </h1>
      <hr>

      <div class="post__meta mb-2">
        <time class="time" :datetime="new Date(post.date_of_application).toLocaleDateString($i18n.locale, optionDate)">
          {{ $t('Date of the application') }}: {{ new Date(post.date_of_application).toLocaleDateString($i18n.locale, optionDate) }}
        </time>

        <div class="post__stats">
          <div class="post__stats--item">
            <svg id="eye" viewBox="0 0 42 24"><path d="M21 0c13.776 0 21 10.357 21 12s-7.224 12-21 12-21-10.357-21-12 7.224-12 21-12zm0 21.232c5.156 0 9.334-4.133 9.334-9.232s-4.179-9.232-9.334-9.232c-5.155 0-9.335 4.133-9.335 9.232s4.179 9.232 9.335 9.232zm0-9.232c-.053 1.096 4.116 2.523 3.3 3.352-1.774 1.803-4.691 1.763-6.513-.088s-1.861-4.813-.087-6.616 4.691-1.763 6.513.088c.984 1-3.15 1.973-3.213 3.264z" /></svg>
            <span>{{ post.views }}</span>
          </div>
        </div>
      </div>

      <div v-if="post.customer.length" class="post__customer mb-2">
        <span>{{ $t('customer') | htmldecode | capitalize }}: </span><span class="lower">{{ post.customer | htmldecode | capitalize }}</span>
      </div>

      <div class="post__question mb-3">
        <b>{{ $t('Question') }}:</b>
        <p>
          {{ post.question }}
        </p>
      </div>

      <p class="post__reply mt-4">
        {{ $t('Reply from CUSTOMIZA') }}:
      </p>

      <div class="post__body">
        <div v-html="deCodeFull(post.answer)" />
      </div>
      <hr>

      <p class="relative mt-5 mb-5 post--user-only">
        {{ $t('posts.similarQuestion') }}
        <br>
        <nuxt-link class="post--user-enter" :to="localePath({ path: '/', hash: '#nav_consultation'})">
          <b>{{ $t('posts.leaveApplication') }}</b>
        </nuxt-link>
      </p>
    </div>
    <footer-site />
  </div>
</template>

<script>
import HeaderForPages from '~/components/header/HeaderForPages'
import FooterSite from '~/components/FooterSite'
import casesMixin from '~/mixins/cases'
import { isClient, isEmpty } from '~/helpers'
import mainMenu from '~/resourse/mainMenu.json'

export default {
  name: 'ViewCase',
  components: {
    HeaderForPages,
    FooterSite
  },
  mixins: [casesMixin],
  data () {
    return {
      optionDate: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      list: mainMenu,
      heightImages: []
    }
  },
  computed: {
    titlePage () {
      return this.post && !isEmpty(this.post) ? this.post.short_title : ''
    }
  },
  async asyncData ({ query, redirect, $axios, req }) {
    if (query.id) {
      const post = await $axios.get(`${process.env.baseUrl}/api/cases/get-case/${query.id}`)

      return {
        id: query.id || null,
        post: post ? post.data.data : post,
        baseURL: isClient ? '' : req.headers.host
      }
    } else {
      redirect('/case/show-cases')
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
    if (isClient && this.post) {
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
      this.$axios.post('/api/cases/update-views', { id })
    }
  }
}
</script>
<style lang="scss">
.lower {
  font-weight: normal;
  line-height: 20px;
}
</style>
