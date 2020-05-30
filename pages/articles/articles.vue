/* eslint-disable vue/no-v-html */
<template>
  <div>
    <HeaderForPages :menu-list="list" />

    <section class="container pt-4">
      <h1 class="center mb-3">
        {{ $t('useful') | capitalize }}&nbsp;{{ $t('Articles') }}&nbsp;{{ $t('and') }}&nbsp;{{ $t('advice') }}
      </h1>
      <template v-if="isArray(posts) && posts.length">
        <article v-for="post in posts" :key="post.id" class="row mx-0 post f-column post__preview">
          <h2 class="post__title">
            <nuxt-link class="post__title--link" :to="`${$i18n.locale !== 'ru' ? '/en' : ''}/articles/show/${post.uid}`">
              {{ post.title | htmldecode | capitalize }}
            </nuxt-link>
          </h2>

          <div class="mb-2">
            <time class="time" :datetime="new Date(post.date).toLocaleDateString($i18n.locale, optionDate)">
              {{ new Date(post.date).toLocaleDateString($i18n.locale, optionDate) }}
            </time>
          </div>
          <template v-if="getImg(post.text)">
            <img :src="getImg(post.text)" :alt="post.title">
          </template>

          <div class="post__body" v-html="decode(post.text)" />

          <div class="row mt-1 justify-content-between mx-0 mb-3">
            <nuxt-link class="post__title--link" :to="`${$i18n.locale !== 'ru' ? '/en' : ''}/articles/show/${post.uid}`">
              <b-button variant="success" size="sm">
                {{ $t('read more') | capitalize }}&nbsp;&rArr;
              </b-button>
            </nuxt-link>

            <div class="post__stats">
              <div class="post__stats--item">
                <svg id="eye" viewBox="0 0 42 24"><path d="M21 0c13.776 0 21 10.357 21 12s-7.224 12-21 12-21-10.357-21-12 7.224-12 21-12zm0 21.232c5.156 0 9.334-4.133 9.334-9.232s-4.179-9.232-9.334-9.232c-5.155 0-9.335 4.133-9.335 9.232s4.179 9.232 9.335 9.232zm0-9.232c-.053 1.096 4.116 2.523 3.3 3.352-1.774 1.803-4.691 1.763-6.513-.088s-1.861-4.813-.087-6.616 4.691-1.763 6.513.088c.984 1-3.15 1.973-3.213 3.264z" /></svg>
                <span>{{ post.view }}</span>
              </div>
              <div class="post__stats--item">
                <svg id="comment" viewBox="0 0 24 24"><path d="M1.5 0h21c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-21c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5zm12 18v6l-7.5-6h7.5z" /></svg>
                <span>{{ post.count_comments }}</span>
              </div>
            </div>
          </div>
          <hr>
        </article>
      </template>
      <b-pagination
        v-if="total > 1"
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        align="center"
        class="mt-4"
        @change="setPage"
      />
      <footer-site />
    </section>
  </div>
</template>

<script>
import HeaderForPages from '~/components/header/HeaderForPages'
import mainMenu from '~/resourse/mainMenu.json'
import FooterSite from '~/components/FooterSite'
import postMixin from '~/mixins/posts'
import { binary, isArray, isClient } from '~/helpers'

export default {
  name: 'Articles',
  watchQuery: ['page'],
  components: {
    FooterSite,
    HeaderForPages
  },
  mixins: [postMixin],
  data () {
    return {
      optionDate: {
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      list: mainMenu,
      // perPage: 10,
      currentPage: this.$route.query.page ? this.$route.query.page : 1
    }
  },
  computed: {
    titlePage () {
      return `${this.$t('useful')}  ${this.$t('Articles')}  ${this.$t('and')}  ${this.$t('advice')}`
    }
  },
  beforeMount () {
    if (isClient()) {
      const start = !this.$route.query.page || Number(this.$route.query.page) === 1 ? 0 : (this.$route.query.page - 1) * this.perPage
      this.$store.dispatch('directory/getPosts', { start, perPage: this.perPage })
    }
  },
  head () {
    const canonical = this.baseURL + this.$route.fullPath

    return {
      title: this.titlePage,
      meta: [
        { name: 'description', hid: 'description', content: `${this.titlePage}, Статьи по 1с` },
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
  methods: {
    isArray,
    decode (code) {
      const html = binary.fromBinary(this.enCode(code))
      const formatText = html.replace(/(<p(.*?)>(.*?)<img\s(.*?)src(.*)>(.*?)<\/p>)/gm, '')
      return `${formatText.slice(0, 470)} ...`
    },
    getImg (code) {
      const html = binary.fromBinary(this.enCode(code))
      let img = html.match(/(<p(.*?)>(.*?)<img\s(.*?)src(.*)>(.*?)<\/p>)/)
      img = img ? img[0].match(/(\ssrc="(.*)\.(jpeg|png|gif|jpg)"\s)/) : []
      return img && img.length ? img[0].replace(/(src=|")/gmi, '').trim() : null
    }
  }
}
</script>
