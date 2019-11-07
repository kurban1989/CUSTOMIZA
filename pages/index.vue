<template>
  <div class="relative">
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

export default {
  components: {
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
      list: ['qwer', 'asdf', 'fgjh', 'zxcbv']
    }
  }
}
</script>
