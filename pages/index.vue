<template>
  <div class="relative">
    <b-modal id="bv-modal-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        <template v-if="otherMessageError">
          {{ $t(messageError) }}
        </template>
        <template v-else>
          {{ $t('checkForm') }}
        </template>
      </p>
    </b-modal>

    <b-modal id="bv-modal-success" :title="$t('sm')" ok-only>
      <p class="note note-success">
        &nbsp;{{ $t('successForm') }}
      </p>
    </b-modal>

    <mobile-menu :menu-list="list" />
    <header-site />
    <how-help-you />
    <what-do-end-up-with />
    <last-cases />
    <capture-form />
    <the-blog />
    <rent-block />
    <contacts />
    <footer-site />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BModal } from 'bootstrap-vue'
import HeaderSite from '~/components/HeaderSite'
import HowHelpYou from '~/components/main/HowHelpYou'
import WhatDoEndUpWith from '~/components/main/WhatDoEndUpWith'
import LastCases from '~/components/main/LastCases'
import CaptureForm from '~/components/main/CaptureForm'
import TheBlog from '~/components/main/TheBlog'
import RentBlock from '~/components/main/RentBlock'
import Contacts from '~/components/main/Contacts'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'
import { isClient } from '~/helpers'

export default {
  name: 'Main',
  components: {
    'b-modal': BModal,
    WhatDoEndUpWith,
    CaptureForm,
    HeaderSite,
    HowHelpYou,
    FooterSite,
    MobileMenu,
    LastCases,
    RentBlock,
    Contacts,
    TheBlog
  },
  data () {
    return {
      list: mainMenu
    }
  },
  computed: {
    ...mapState({
      otherMessageError: state => state.statusForm.messageErrorBadRequest,
      messageError: state => state.statusForm.messageError
    }),
    titlePage () {
      return this.$t('mainH1')
    }
  },
  asyncData ({ store, req }) {
    return {
      baseURL: isClient ? '' : req.headers.host
    }
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
  }
}
</script>
