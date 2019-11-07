<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="mobile-menu relative flex bg-standart-options"
    >
      <div class="close-menu bg-standart-options pointer" role="button" @click="closeMenu" />
      <div v-scroll-lock="isShow" class="sections-menu">
        <div
          v-for="(item, index) of menuList"
          :key="index"
          class="sections-menu--item content-center"
        >
          <nuxt-link to="/">
            {{ item }}
          </nuxt-link>
        </div>

        <switcher-lang />
      </div>
      <phone-call-block />
      <p class="sections-menu sections-menu--text content-center">
        {{ $t('Free call in Russia') }}
      </p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'Vuex'
import PhoneCallBlock from '~/components/blocks/PhoneCallBlock'
import SwitcherLang from '~/components/blocks/SwitcherLang'

export default {
  name: 'MobileMenu',
  components: {
    PhoneCallBlock,
    SwitcherLang
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.directory.showMobileMenu
    })
  },
  methods: {
    closeMenu () {
      this.$store.dispatch('directory/switchMobileMenu', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #6B9638;
  background-image: url('~assets/header/mobile-bg.jpg');
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
}
.close-menu {
  width: 19px;
  height: 19px;
  position: absolute;
  top: 5%;
  right: 6%;
  background-image: url('~assets/icon/close.svg');
}
.sections-menu {
  width: 320px;
  padding: 0 15px;

  &--text {
    color: rgba(255, 255, 255, 0.57);
  }

  &--item {
    width: auto;
    font-size: 18px;
    margin-bottom: 30px;

    a {
      color: #fff;
    }

    &:last-child {
      margin-bottom: 70px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition-duration: .25s;
  transition-property: transform;
}
.fade-enter, .fade-leave-to {
  transform: translateY(-100%);
}

/deep/ .switcher-lang {
  margin: 0 auto;
  margin-bottom: 20px;
}

@media (min-width: 992px) {
  .mobile-menu {
    display: none;
  }
}
@media (min-width: 768px) {
  /deep/ .switcher-lang {
    display: none;
  }
}
</style>
