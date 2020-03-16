<template>
  <div class="relative">
    <b-modal id="bv-signup-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        {{$t(messageError)}}
      </p>
    </b-modal>
    <mobile-menu :menu-list="list" />
    <header-site :slotHead="true" :header="$t('UserRegistration')">
      <div class="container">
        <loading-spinner :is-loading="loading" />
        <div class="row">
          <div class="col-sm for-leave-rent">
            <div class="row mb-3">
              <base-input
                :class="{'error-input': errorFirstName}"
                v-model.trim="user.firstName"
                :placeholder="$t('Name')"
                type="text"
              />
            </div>
            <div class="row mb-3">
              <base-input
                :class="{'error-input': errorLastName}"
                v-model.trim="user.lastName"
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
              <primary-button class="align-self-end" @click="signup">
                <span>
                  {{$t('Registration')}}
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
// eslint-disable-next-line no-unused-vars
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
      loading: false
    }
  },
  methods: {
    signup () {
      this.errorFirstName = this.user.firstName === ''
      this.errorLastName = this.user.lastName === ''
      this.errorEmail = this.errorEmail || this.user.email === ''
      this.errorPassword = this.user.password.length < 6
      this.errorPasswordReplay = this.user.passwordReplay.length < 6 || this.user.passwordReplay !== this.user.password
      const error = this.errorFirstName || this.errorLastName || this.errorEmail || this.errorPassword || this.errorPasswordReplay
      if (error) {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-signup-error')
        return false
      }
      this.loading = true
      request({ url: 'api/auth/signup', body: this.user }).then((res) => {
        if (res.data.status === 'ERROR') {
          this.messageError = res.data.message
          this.$bvModal.show('bv-signup-error')
        } else if (res.data.status === 'OK') {
          this.$auth.loginWith('local', { data: { login: this.user.email, password: this.user.password } }).catch(() => {
            this.messageError = 'ErrorLogin'
            this.$bvModal.show('bv-signup-error')
          })
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
    }
  }
}
</script>
