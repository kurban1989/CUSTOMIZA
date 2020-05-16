<template>
  <div class="relative">
    <b-modal id="bv-forgot-message" :title="$t('sm')" ok-only @hidden="onOk">
      <p class="note note-error">
        {{ $t(messageError) }}
      </p>
    </b-modal>
    <mobile-menu :menu-list="list" />
    <header-site :slot-head="true" header="">
      <div class="container" style="max-width: 500px">
        <h1 class="h1 h5 row">
          {{ $t('HeaderForgotPassword') }}
        </h1>
        <div class="row">
          <loading-spinner :is-loading="loading" />
          <div class="col-sm for-leave-rent">
            <div class="row mb-3">
              <base-input
                v-model="user.email"
                :class="{'error-input': errorEmail}"
                type="email"
                :placeholder="$t('Email')"
                data-type="email"
                @is-valid-email="validEmail"
              />
            </div>
            <div class="row justify-content-end">
              <primary-button class="align-self-end" @click="forgot">
                <span>
                  {{ $t('RestorePassword') }}
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
import { required, minLength } from 'vuelidate/lib/validators'
import BaseInput from '~/components/elements/BaseInput'
import PrimaryButton from '~/components/elements/PrimaryButton'
import HeaderSite from '~/components/HeaderSite'
import FooterSite from '~/components/FooterSite'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'

export default {
  middleware: ['guest'],
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
        email: ''
      },
      messageError: 'checkForm',
      errorEmail: false,
      success: false,
      loading: false
    }
  },
  methods: {
    forgot () {
      this.errorEmail = this.errorEmail || this.user.email === ''
      const error = this.errorEmail
      if (error) {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-forgot-message')
        return false
      }
      this.loading = true
      this.$axios.post('/api/auth/forgot', this.user).then((res) => {
        if (res.data.status === 'ERROR') {
          this.success = false
          this.messageError = res.data.message
          this.$bvModal.show('bv-forgot-message')
        } else if (res.data.status === 'OK') {
          this.success = true
          this.messageError = 'MessageForgotPassword'
          this.$bvModal.show('bv-forgot-message')
        }
      }).catch(() => {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-forgot-message')
      }).finally(() => {
        this.loading = false
      })
    },
    validEmail (isEmail) {
      if (isEmail) {
        this.errorEmail = false
      } else {
        this.errorEmail = true
      }
    },
    onOk () {
      if (this.success) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
