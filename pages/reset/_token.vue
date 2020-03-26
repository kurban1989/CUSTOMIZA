<template>
  <div class="relative">
    <b-modal id="bv-reset-result" :title="$t('sm')" ok-only>
      <p class="note note-error">
        {{$t(messageError)}}
      </p>
    </b-modal>
    <mobile-menu :menu-list="list" />
    <header-site :slotHead="true" header="">
      <div class="container" style="max-width: 500px">
        <h1 class="h1 h5 row">
          {{ $t('NewPassword') }}
        </h1>
        <div class="row">
          <loading-spinner :is-loading="loading" />
          <div class="col-sm for-leave-rent">
            <div class="row mb-3">
              <base-input
                :class="{'error-input': errorPassword}"
                autocomplete="new-password"
                v-model.trim="user.password"
                :placeholder="$t('Password')"
                type="password"
                data-type="password"
              />
            </div>
            <div class="row mb-3">
              <base-input
                :class="{'error-input': errorPasswordReplay}"
                autocomplete="new-password"
                v-model.trim="user.passwordReplay"
                :placeholder="$t('PasswordReplay')"
                type="password"
                data-type="password"
              />
            </div>
            <div class="row justify-content-end">
              <primary-button class="align-self-end" @click="reset">
                <span>
                  {{$t('Save')}}
                </span>
              </primary-button>
            </div>
          </div>
        </div>
      </div>
    </header-site>
    <footer-site />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import axios from 'axios'
import { request } from '~/helpers'
import BaseInput from '~/components/elements/BaseInput'
import PrimaryButton from '~/components/elements/PrimaryButton'
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
    const check = await request({ url: '/api/auth/checktoken', body: { token: params.token } })
    // Local
    // const check = await axios.post('http://localhost:3000/api/auth/checktoken', { token: params.token })
    return check.data.status === 'OK'
  },
  components: {
    HeaderSite,
    FooterSite,
    MobileMenu,
    PrimaryButton,
    BaseInput,
    LoadingSpinner
  },
  data () {
    return {
      list: mainMenu,
      user: {
        password: '',
        passwordReplay: ''
      },
      messageError: 'checkForm',
      errorPassword: false,
      errorPasswordReplay: false,
      loading: false
    }
  },
  methods: {
    reset () {
      this.errorPassword = !this.user.password || this.user.password.length < 6
      this.errorPasswordReplay = !this.user.passwordReplay || this.user.passwordReplay.length < 6 || this.user.passwordReplay !== this.user.password
      const error = this.errorPassword || this.errorPasswordReplay
      if (error) {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-reset-result')
        return false
      }
      this.loading = true
      this.$axios.post('/api/auth/reset', { user: this.user, token: this.$route.params.token }).then((res) => {
        if (res.data.status === 'ERROR') {
          this.messageError = res.data.message
          this.$bvModal.show('bv-forgot-message')
        } else if (res.data.status === 'OK') {
          this.$auth.loginWith('local', { data: { email: res.data.user.email, password: this.user.password } }).catch(() => {
            this.messageError = 'ErrorLogin'
            this.$bvModal.show('bv-reset-result')
          })
        }
      }).catch(() => {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-reset-result')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
