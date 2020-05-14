<template>
  <nav class="container" v-bind="$attrs">
    <div class="row no-gutters header">
      <nuxt-link :to="localePath({ path: '/' })" class="logo bg-standart-options col-3 col-md-2" />
      <div class="col-lg-9 col-md-10 col-9 offset-lg-1 menu-group align-self-center align-self-md-start">
        <div class="row no-gutters justify-content-lg-between justify-content-md-end blocks-center">
          <ul class="col no-gutters flex justify-content-lg-start justify-content-end align-items-center align-items-md-start">
            <li
              v-for="(item, index) in mainMenu"
              :key="index"
              class="link item-menu"
              :title="item.hint"
            >
              <nuxt-link :to="localePath({ path: '/', hash: `#nav_${item.link}`})" class="a-link">
                {{ $t(item.title) }}
              </nuxt-link>
            </li>
            <li class="link item-menu">
              <nuxt-link :to="localePath({ path: '/articles' })" class="a-link">
                <!-- {{ $t('Articles') }} -->
                {{ $auth.$state }}
              </nuxt-link>
            </li>
            <li class="phone-call-block">
              <phone-call-block />
            </li>
            <li class="burger no-outline pointer relative" role="button" area-mobile="mobile-menu" @click="showMenu">
              <span />
              <span />
              <span />
            </li>
          </ul>

          <div class="col-sm-7 col-md-5 col-lg-5 col-xl-4 personal-area only-desktop">
            <log-in />
            <switcher-lang />
          </div>
        </div>
        <div class="row no-gutters justify-content-end">
          <div class="row no-gutters justify-content-start only-desktop">
            <div class="phone">
              <a href="tel:+78005005050" class="link">8 (800) 500-50-50</a>
              <p class="phone--text">
                {{ $t('Free call in Russia') }}
              </p>
            </div>
            <primary-button class="a-link-btn" :link="true" :to="localePath({ path: '/', hash: '#nav_consultation'})">
              <div class="btn-text">
                {{ $t('Get free consultation on 1C') }}
              </div>
            </primary-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import PrimaryButton from '~/components/elements/PrimaryButton'
import PhoneCallBlock from '~/components/blocks/PhoneCallBlock'
import SwitcherLang from '~/components/blocks/SwitcherLang'
import LogIn from '~/components/blocks/LogIn'
import mainMenu from '~/resourse/mainMenu.json'

export default {
  components: {
    PrimaryButton,
    PhoneCallBlock,
    SwitcherLang,
    LogIn
  },
  data () {
    return {
      mainMenu
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.directory.showMobileMenu
    })
  },
  methods: {
    showMenu () {
      this.$store.dispatch('directory/switchMobileMenu', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-text {
  font-size: 14px;
  line-height: 1.3em;
}

.header {
  padding-top: 40px;
  height: 176px;
  align-items: flex-start;
}

.menu-group {
  width: 100%;
  height: 100px;
}

.container {
  padding: 0;
}

.phone {
  display: inline-block;
  margin-right: 30px;

  &--text {
    font-size: 14px;
  }

  .link {
    font-size: 24px;
  }
}

.personal-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.burger {
    width: 25px;
    height: 19px;
    background: none;
    padding: 0;
    color: #000;
    overflow: hidden;
    outline: none;
    margin-right: 10px;

    span {
      position: absolute;
      left: 0;
      height: 3px;
      width: 100%;
      display: block;
      background: currentColor;
      opacity: 1;
      pointer-events: none;
      border-radius: 30px;

      &:first-child {
        top: 0;
      }

      &:nth-child(2) {
        top: 8px;
      }

      &:last-child {
        bottom: 0;
      }
    }
}

.phone-call-block {
  display: none;
  margin-right: 20px;
}

/deep/ .primary {
  width: 224px;
  height: 56px;
}

@media (min-width: 992px) {
  .burger {
    display: none;
  }
}

@media (max-width: 991px) {
  nav {
    margin-bottom: 30px;
  }
  .item-menu {
    margin-right: 20px;
  }
  .item-menu {
    display: none;
  }
}
@media (max-width: 768px) {
  .only-desktop {
    display: none;
  }
  ul {
    margin-bottom: 0;
  }
  nav {
    margin-bottom: 20px;
  }
  .header {
    padding-top: 10px;
    height: 60px;
  }
  .menu-group {
    height: inherit;

    .blocks-center {
      align-items: center;
      height: inherit;
    }
  }
  .burger {
    margin-right: 0;
  }
  .phone-call-block {
    display: block;
    /deep/ .mobile-menu {
      &__phone-area {
        padding: 8px 13px;
        margin-bottom: 0;
        max-width: 100%;
      }
      &__link-call {
        font-size: 12px;
        font-weight: 700;
      }

      &__icon-call {
        padding-left: 42px;
        height: fit-content;
        background-size: contain;
      }
    }
  }
}
</style>
