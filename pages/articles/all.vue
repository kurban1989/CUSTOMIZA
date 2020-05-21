<template>
  <div class="container relative">
    <div class="row no-gutters header header-ed">
      <nuxt-link :to="localePath({ path: '/' })" class="logo logo-ed bg-standart-options col-3 col-md-2" />
      <div class="row col-lg-9 col-md-10 col-9 offset-lg-1 menu-group align-self-center">
        <ul class="col no-gutters flex justify-content-lg-start justify-content-end align-items-center">
          <li
            v-for="(item, index) in articleMenu"
            :key="index"
            class="link item-menu"
            :title="item.hint"
          >
            <nuxt-link :to="localePath({ path: `/${item.link}`})" class="a-link">
              {{ $t(item.title) }}
            </nuxt-link>
          </li>
        </ul>
        <div class="row col-sm-7 col-md-5 col-lg-5 col-xl-4 personal-area only-desktop">
          <log-in />
          <switcher-lang />
        </div>
      </div>
    </div>

    <template v-if="isArray(posts) && posts.length">
      <div v-for="post in posts" :key="post.id" class="row f-column">
        <hr>
        <div class="post mb-2">
          <span class="post__author">Автор:</span>
          <span class="post__author post__author--name">
            {{ post.author }}
          </span>

          <span>
            <time :datetime="dateFormat(post.date)">
              {{ dateFormat(post.date) }}
            </time>
          </span>
        </div>

        <h2 class="post__title">
          {{ post.title | capitalize }}
        </h2>
        <p>
          &nbsp;{{ decode(post.text) }}
        </p>

        <div class="row mt-4 justify-content-between mx-0">
          <secodary-button class="justify-self-start" @click="goto(post.uid)">
            <span>
              {{ $t('preview') }}
            </span>
          </secodary-button>
          <secodary-button class="align-self-end justify-self-end" @click="edit(post.uid)">
            <span>
              {{ $t('edit') }}
            </span>
          </secodary-button>
        </div>
      </div>
    </template>
    <hr>
    <b-pagination
      v-model="currentPage"
      :total-rows="total"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      align="center"
      class="mt-4"
      @change="setPage"
    />
    <footer-site />
  </div>
</template>

<script>
import SwitcherLang from '~/components/blocks/SwitcherLang'
import LogIn from '~/components/blocks/LogIn'
import SecodaryButton from '~/components/elements/SecodaryButton.vue'
import articleMenu from '~/resourse/articleMenu.json'
import postMixin from '~/mixins/posts'
import FooterSite from '~/components/FooterSite'
import { binary, isArray } from '~/helpers'

export default {
  name: 'AllArticles',
  watchQuery: ['page'],
  components: {
    SwitcherLang,
    SecodaryButton,
    FooterSite,
    LogIn
  },
  mixins: [postMixin],
  data () {
    return {
      articleMenu
    }
  },
  middleware: ['auth', 'notUser'],
  methods: {
    isArray,
    decode (code) {
      const formatText = binary.fromBinary(this.enCode(code))
        .replace(/(<p(.*?)>(.*?)<img\s(.*?)src(.*)>(.*?)<\/p>)/gm, '')
        .replace(/(&nbsp;)/gm, ' ')
        .replace(/(<(\/?[^>]+)>)/gm, '')
      return `${formatText.slice(0, 250)} ...`
    },
    dateFormat (dateUTC) {
      return new Date(dateUTC).toLocaleString(this.$i18n.locale, {
        month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    },
    edit (uid) {
      this.$router.push({ path: '/articles/edit', query: { uid } })
    },
    goto (uid) {
      this.$router.push({ path: `/articles/show/${uid}` })
    }
  }
}
</script>
