<template>
  <div class="relative">
    <mobile-menu :menu-list="list" />
    <header-site :slot-head="true" header="">
      <div class="container">
        <h1 v-if="success" class="h1 row text-black">
          {{ $t('Hello') }}! {{ user.firstName }}, {{ $t('confirmSuccess') }}.
        </h1>
        <h1 v-if="!success && !loading" class="h1 row text-black">
          {{ $t('badRequest') }}
        </h1>
        <div class="row">
          <loading-spinner :is-loading="loading" />
        </div>
      </div>
    </header-site>
    <footer-site />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { request } from '~/helpers'
import HeaderSite from '~/components/HeaderSite'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'

export default {
  middleware: 'guest',
  async validate ({ params }) {
    // Production
    // eslint-disable-next-line no-return-await
    // const check = await request({ url: 'http://customiza.ru/api/auth/checkconfirmtoken', body: { token: params.token } })
    // Local
    const check = await request({ url: 'http://localhost:3000/api/auth/checkconfirmtoken', body: { token: params.token } })
    return check && check.data.status === 'OK'
  },
  components: {
    HeaderSite,
    FooterSite,
    MobileMenu,
    LoadingSpinner
  },
  data () {
    return {
      list: mainMenu,
      user: {},
      loading: true,
      success: false
    }
  },
  mounted () {
    this.confirm()
  },
  methods: {
    confirm () {
      this.loading = true
      this.$axios.post('/api/auth/confirmemail', { token: this.$route.params.token }).then((res) => {
        if (res.data.status === 'OK') {
          this.user = res.data.user
          this.success = true
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
