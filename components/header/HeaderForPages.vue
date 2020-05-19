<template>
  <div class="header-art" v-bind="$attrs">
    <mobile-menu :menu-list="menuList" />
    <header class="header container">
      <navbar class="mb-4" />
    </header>
  </div>
</template>

<script>
import Navbar from '~/components/header/Navbar'
import MobileMenu from '~/components/menus/MobileMenu'

export default {
  name: 'HeaderForPages',
  components: {
    MobileMenu,
    Navbar
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  }
}
</script>
