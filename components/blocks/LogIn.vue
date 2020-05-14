<template>
  <div>
    <b-modal :id="mobile ? 'bv-login-error-mobile' : 'bv-login-error'" :title="$t('sm')" :ok-only="!notVerified" @ok="onVerified">
      <p class="note note-error">
        {{ $t(messageError) }}
      </p>
    </b-modal>
    <b-dropdown
      v-if="$auth.$state.loggedIn"
      size="sm"
      right
      :text="$auth.user.lastName + ' ' + $auth.user.firstName"
      variant="dropdown-user"
      :class="{'font-mobile-style': mobile}"
    >
      <b-dropdown-header>{{ $t($auth.user.roleName) }}</b-dropdown-header>
      <b-dropdown-divider />
      <template v-for="(item, index) in userMenu">
        <span :key="index" @click="closeMenu">
          <b-dropdown-item v-if="item[$auth.user.roleName]" :title="$t(item.hint)" :to="`${item.link}`">{{ $t(item.title) }}</b-dropdown-item>
        </span>
      </template>
      <b-dropdown-divider />
      <div class="mx-2 ">
        <primary-button class="button-logout" @click="$auth.logout()">
          {{ $t('LogOut') }}
        </primary-button>
      </div>
    </b-dropdown>
    <template v-else>
      <a class="a-login" :class="{'font-mobile-style': mobile}" @click="openLogIn">
        {{ $t('LogInToYourAccount') }}
      </a>
      <b-modal :id="mobile ? 'login-modal-mobile' : 'login-modal'" hide-footer centered :title="$t('LogInToYourAccount')">
        <loading-spinner :is-loading="loading" />
        <form
          class="relative px-3"
        >
          <div class="row">
            <div class="col-sm for-leave-rent">
              <div class="row mb-3">
                <base-input
                  v-model.trim="user.email"
                  :class="{'error-input': errorEmail}"
                  type="email"
                  :placeholder="$t('Email')"
                  data-type="email"
                  @is-valid-email="validEmail"
                />
              </div>
              <div class="row">
                <base-input
                  v-model.trim="user.password"
                  :class="{'error-input': errorPassword}"
                  :placeholder="$t('Password')"
                  type="password"
                  data-type="password"
                />
              </div>
            </div>
          </div>
        </form>
        <div class="justify-content-center place-button text-right mt-3">
          <span @click="closeMenu"><nuxt-link :to="localePath('forgot')" class="a-login mr-3 align-middle">{{ $t('ForgotPassword') }}</nuxt-link></span>
          <span @click="closeMenu"><nuxt-link :to="localePath('signup')" class="a-login mr-3 align-middle">{{ $t('Registration') }}</nuxt-link></span>
          <secodary-button class="align-self-end" @click="login">
            <span>
              {{ $t('LogIn') }}
            </span>
          </secodary-button>
        </div>
      </b-modal>
    </template>
  </div>
</template>

<script>
import BaseInput from '~/components/elements/BaseInput'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import SecodaryButton from '~/components/elements/SecodaryButton'
import PrimaryButton from '~/components/elements/PrimaryButton'
import userMenu from '~/resourse/userMenu.json'

export default {
  name: 'LogIn',
  components: {
    BaseInput,
    LoadingSpinner,
    SecodaryButton,
    PrimaryButton
  },
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      userMenu,
      user: {
        email: '',
        password: ''
      },
      messageError: 'checkForm',
      errorEmail: false,
      errorPassword: false,
      loading: false,
      notVerified: false
    }
  },
  mouted () {
    console.info(this.$auth, '\n', this.$auth.$state.loggedIn, '\n', this.$auth.$state, '\n')
  },
  methods: {
    closeMenu () {
      this.$store.dispatch('directory/switchMobileMenu', false)
    },
    openLogIn () {
      this.$bvModal.show(this.mobile ? 'login-modal-mobile' : 'login-modal')
    },
    login () {
      this.errorEmail = this.errorEmail || this.user.email === ''
      this.errorPassword = this.errorPassword || this.user.password === ''
      if (this.errorEmail || this.errorPassword) {
        this.messageError = 'checkForm'
        this.$bvModal.show(this.mobile ? 'bv-login-error-mobile' : 'bv-login-error')
        return false
      }
      this.loading = true
      this.$auth.loginWith('local', { data: this.user }).then(() => {
        this.$bvModal.hide(this.mobile ? 'login-modal-mobile' : 'login-modal')
      }).catch((err) => {
        if (err.response.data.message && err.response.data.message === 'E-mail not verified') {
          this.notVerified = true
          this.messageError = 'ConfirmEmail'
          this.$bvModal.show(this.mobile ? 'bv-login-error-mobile' : 'bv-login-error')
        } else {
          this.messageError = 'ErrorLogin'
          this.$bvModal.show(this.mobile ? 'bv-login-error-mobile' : 'bv-login-error')
        }
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
    onVerified () {
      if (this.notVerified) {
        this.$axios.post('/api/auth/confirm', this.user)
      }
    }
  }
}
</script>

<style lang="scss">
  .a-login {
    font-size: 14px;
    color: #000 !important;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline !important;
    }
  }
  .btn-dropdown-user {
    padding: 0 !important;
    background: inherit;
    border: 0;
    color: #000;
  }
  .button-logout {
    min-height: 20px !important;
    height: 40px !important;
    width: 100% !important;
    line-height: 1 !important;
    padding: 10px !important;
  }
  .font-mobile-style {
    font-size: 18px;
    color: #fff!important;
    .btn-dropdown-user {
      font-size: 18px;
      color: #fff!important;
    }
  }
</style>
