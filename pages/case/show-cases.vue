<template>
  <div>
    <HeaderForPages :menu-list="list" />
    <div class="container pt-4">
      <h1 class="center mb-3">
        {{ $t('Solved cases') | capitalize }}&nbsp;{{ $t('by') }}&nbsp;1C
      </h1>
      <template v-if="isArray(cases) && cases.length">
        <article v-for="post in cases" :key="post.id" class="row mx-0 post relative f-column post__preview post__preview--shadow mb-4 pb-3">
          <div class="post__stats--item absolute">
            <svg id="eye" viewBox="0 0 42 24"><path d="M21 0c13.776 0 21 10.357 21 12s-7.224 12-21 12-21-10.357-21-12 7.224-12 21-12zm0 21.232c5.156 0 9.334-4.133 9.334-9.232s-4.179-9.232-9.334-9.232c-5.155 0-9.335 4.133-9.335 9.232s4.179 9.232 9.335 9.232zm0-9.232c-.053 1.096 4.116 2.523 3.3 3.352-1.774 1.803-4.691 1.763-6.513-.088s-1.861-4.813-.087-6.616 4.691-1.763 6.513.088c.984 1-3.15 1.973-3.213 3.264z" /></svg>
            <span>{{ post.views }}</span>
          </div>

          <h2 class="post__title">
            <nuxt-link class="post__title--link" :to="`${$i18n.locale !== 'ru' ? '/en' : ''}/case/views?id=${post.id}`">
              {{ post.short_title | htmldecode | capitalize }}
            </nuxt-link>
          </h2>

          <div class="mb-2">
            <time class="time time--case" :datetime="new Date(post.date_of_application).toLocaleDateString($i18n.locale, optionDate)">
              {{ $t('Date of the application') }}: {{ new Date(post.date_of_application).toLocaleDateString($i18n.locale, optionDate) }}
            </time>
          </div>
          <div v-if="post.customer.length" class="post__customer mb-2">
            <span>{{ $t('customer') | capitalize }}: </span><span>{{ post.customer | htmldecode }}</span>
          </div>

          <div>
            <b>{{ $t('Question') }}:</b>
            <p>
              {{ post.question | htmldecode | capitalize }}
            </p>
          </div>

          <p class="post__reply mt-4">
            {{ $t('Reply from CUSTOMIZA') }}:
          </p>

          <div class="post__body pt-0 mb-0" v-html="deCode(post.answer, 200)" />

          <hr>

          <nuxt-link class="post__title--link" :to="`${$i18n.locale !== 'ru' ? '/en' : ''}/case/views?id=${post.id}`">
            <b-button variant="success" size="sm">
              {{ $t('read more') | capitalize }}&nbsp;&rArr;
            </b-button>
          </nuxt-link>
        </article>
      </template>
      <footer-site />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderForPages from '~/components/header/HeaderForPages'
import FooterSite from '~/components/FooterSite'
import mainMenu from '~/resourse/mainMenu.json'
import { isArray, isClient } from '~/helpers'
import casesMixin from '~/mixins/cases'

export default {
  name: 'ShowCases',
  components: {
    HeaderForPages,
    FooterSite
  },
  mixins: [casesMixin],
  data () {
    return {
      optionDate: {
        month: 'long',
        // weekday: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      list: mainMenu
    }
  },
  computed: {
    ...mapState({
      cases: state => state.readyCase.casesForUser
    }),
    titlePage () {
      return this.$t('Solved cases')
    }
  },
  asyncData ({ store, req }) {
    return {
      baseURL: isClient ? '' : req.headers.host
    }
  },
  beforeMount () {
    this.$store.dispatch('readyCase/get')
  },
  head () {
    const canonical = this.baseURL + this.$route.fullPath

    return {
      title: this.titlePage,
      meta: [
        { name: 'description', hid: 'description', content: this.titlePage },
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
    isArray
  }
}
</script>
