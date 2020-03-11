<template>
  <div>
    <span v-if="$auth.$state.loggedIn" :class="{'a-login-mobile': mobile}">
      {{$auth.user.name}}
      <primary-button @click="$auth.logout()" class="button-logout">
        {{ $t('LogOut') }}
      </primary-button>
    </span>
    <a v-else class="a-login" :class="{'a-login-mobile': mobile}" v-b-modal.modal-center>
      {{ $t('LogInToYourAccount') }}
    </a>
    <b-modal ref="login-modal" id="modal-center" hide-footer centered :title="$t(toRegister?'UserRegistration':'LogInToYourAccount')">
      <loading-spinner :is-loading="loading" />
      <form
        class="relative pl-3 pr-3"
      >
        <template
          v-if="!toRegister">
          <div class="row">
            <div class="col-sm for-leave-rent">
              <div class="row mb-3">
                <base-input
                  v-model="user.login"
                  :class="{'error-input': errorInput}"
                  type="email"
                  :placeholder="$t('Email')"
                  data-type="email"
                  @is-valid-email="validEmail"
                />
              </div>
              <div class="row">
                <base-input
                  v-model="user.password"
                  :placeholder="$t('Password')"
                  type="password"
                  data-type="password"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col-sm for-leave-rent">
              <div class="row mb-3">
                <base-input
                  :placeholder="$t('Name')"
                />
              </div>
              <div class="row mb-3">
                <base-input
                  :placeholder="$t('Surname')"
                />
              </div>
              <div class="row mb-3">
                <base-input
                  type="phone"
                  :placeholder="$t('Your telephone')"
                  data-type="phone"
                />
              </div>
              <div class="row mb-3">
                <base-input
                  :class="{'error-input': errorInput}"
                  type="email"
                  :placeholder="$t('Email')"
                  data-type="email"
                  @is-valid-email="validEmail"
                />
              </div>
              <div class="row mb-3">
                <base-input
                  :placeholder="$t('Password')"
                  type="password"
                  data-type="password"
                />
              </div>
              <div class="row">
                <base-input
                  :placeholder="$t('PasswordRepeater')"
                  type="password"
                  data-type="password"
                />
              </div>
            </div>
          </div>
        </template>
      </form>
      <div class="justify-content-center place-button text-right mt-3">
        <a class="a-login mr-3 align-middle" @click="loginOrRegister">{{$t(toRegister?'LogIn':'Registration')}}</a>
        <secodary-button class="align-self-end" @click="login">
            <span>
              {{$t(toRegister?'Registration':'LogIn')}}
            </span>
        </secodary-button>
      </div>
<!--      <template v-slot:modal-footer>-->
<!--        <div class="justify-content-center place-button">-->
<!--          <a class="a-login mr-3 align-middle" @click="loginOrRegister">{{$t(toRegister?'LogIn':'Registration')}}</a>-->
<!--          <secodary-button class="align-self-end" @click="login">-->
<!--            <span>-->
<!--              {{$t(toRegister?'Registration':'LogIn')}}-->
<!--            </span>-->
<!--          </secodary-button>-->
<!--        </div>-->
<!--      </template>-->
    </b-modal>
  </div>
</template>

<script>
import BaseInput from '~/components/elements/BaseInput'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import SecodaryButton from '~/components/elements/SecodaryButton'
import PrimaryButton from '~/components/elements/PrimaryButton'

export default {
  name: 'LogIn',
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    BaseInput,
    LoadingSpinner,
    SecodaryButton,
    PrimaryButton
  },
  data () {
    return {
      user: {
        login: '',
        password: ''
      },
      dataForm: {
        name: '',
        email: '',
        phone: '',
        question: '',
        isCheckedPersonalData: false,
        errors: false,
        file: null
      },
      errorInput: false,
      loading: false,
      toRegister: false
    }
  },
  methods: {
    loginOrRegister () {
      this.toRegister = !this.toRegister
    },
    login () {
      this.loading = true
      this.$auth.loginWith('local', { data: this.user }).then(() => {
        this.$refs['login-modal'].hide()
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
      // try {
      //   this.loading = true;
      //   await this.$auth.loginWith('local', { data: this.user })
      //   this.$refs['login-modal'].hide()
      //   this.loading = false;
      // } catch (err) {
      //   console.log(err)
      // }
    },
    validEmail (isEmail) {
      if (isEmail) {
        this.dataForm.errors = false
        this.errorInput = false
      } else {
        this.dataForm.errors = true
        this.errorInput = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .a-login {
    font-size: 14px;
    color: #000 !important;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline !important;
    }
  }
  .button-logout {
    min-height: 20px!important;
    height: auto!important;
    width: auto!important;
    line-height: 1!important;
    padding: 5px!important;
  }
  .a-login-mobile {
    font-size: 18px;
    color: #fff!important;
  }
</style>
