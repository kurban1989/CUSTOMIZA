<template>
  <div class="relative">
    <b-modal id="bv-signup-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        {{ $t(messageError) }}
      </p>
    </b-modal>
    <mobile-menu :menu-list="list" />
    <header-site :slot-head="true" :header="$t('UserRegistration')">
      <div v-if="success" class="container">
        <h1 class="h1 h3 row text-black">
          {{ $t('Hello') }}! {{ user.firstName }}, {{ $t('successfulRegistration') }}
        </h1>
      </div>
      <div v-else class="container">
        <loading-spinner :is-loading="loading" />
        <div class="row">
          <div class="col-sm for-leave-rent">
            <div class="row mb-3">
              <base-input
                v-model.trim="user.firstName"
                :class="{'error-input': errorFirstName}"
                :placeholder="$t('Name')"
                type="text"
              />
            </div>
            <div class="row mb-3">
              <base-input
                v-model.trim="user.lastName"
                :class="{'error-input': errorLastName}"
                :placeholder="$t('Surname')"
              />
            </div>
            <div class="row mb-3">
              <base-input
                v-model="user.phone"
                :class="{'error-input': errorPhone}"
                type="phone"
                :placeholder="$t('Your telephone')"
                data-type="phone"
              />
            </div>
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
            <div class="row mb-3">
              <base-input
                v-model.trim="user.password"
                :class="{'error-input': errorPassword}"
                autocomplete="new-password"
                :placeholder="$t('Password')"
                type="password"
                data-type="password"
              />
            </div>
            <div class="row mb-3">
              <base-input
                v-model.trim="user.passwordReplay"
                :class="{'error-input': errorPasswordReplay}"
                autocomplete="new-password"
                :placeholder="$t('PasswordReplay')"
                type="password"
                data-type="password"
              />
            </div>
            <div class="row mb-3">
              <g-recaptcha :error="errorRecaptchaToken" @expired="onVerify" @verify="onVerify" />
            </div>
            <div class="row justify-content-end">
              <primary-button class="align-self-end" @click="signup">
                <span>
                  {{ $t('Registration') }}
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
import GRecaptcha from '~/components/elements/GRecaptcha'
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
    GRecaptcha,
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
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordReplay: ''
      },
      validations: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        password: {
          required,
          minLength: 6
        },
        passwordReplay: {
          required,
          minLength: 6
        }
      },
      messageError: 'checkForm',
      errorEmail: false,
      errorPassword: false,
      errorPasswordReplay: false,
      errorFirstName: false,
      errorLastName: false,
      errorPhone: false,
      loading: false,
      recaptchaToken: null,
      errorRecaptchaToken: null,
      success: false
    }
  },
  methods: {
    signup () {
      this.errorRecaptchaToken = !this.recaptchaToken
      this.errorPhone = this.user.phone.length < 18
      this.errorFirstName = this.user.firstName === ''
      this.errorLastName = this.user.lastName === ''
      this.errorEmail = this.errorEmail || this.user.email === ''
      this.errorPassword = this.user.password.length < 6
      this.errorPasswordReplay = this.user.passwordReplay !== this.user.password
      const error = this.errorPhone || this.errorFirstName || this.errorLastName || this.errorEmail || this.errorRecaptchaToken
      if (error || this.errorPassword || this.errorPasswordReplay) {
        if (this.errorPasswordReplay) {
          this.messageError = 'checkPasswordReplay'
        }
        if (this.errorPassword) {
          this.messageError = 'checkPassword'
        }
        if (error) {
          this.messageError = 'checkForm'
        }
        this.$bvModal.show('bv-signup-error')
        return false
      }
      this.loading = true
      this.$axios.post(process.env.baseUrl + '/api/auth/signup', { user: this.user, recaptchaToken: this.recaptchaToken }).then((res) => {
        if (res.data.status === 'ERROR') {
          this.messageError = res.data.message
          this.$bvModal.show('bv-signup-error')
        } else if (res.data.status === 'OK') {
          this.success = true
          this.$axios.post(process.env.baseUrl + '/api/auth/confirm', this.user)
        }
      }).catch(() => {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-signup-error')
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
    onVerify (response) {
      this.errorRecaptchaToken = !response
      this.recaptchaToken = response
    }
  }
}
</script>
