<template>
  <div>
    <a @click="openLogIn" class="a-login" :class="{'a-login-mobile': mobile}" v-b-modal.modal-center>
      {{ $t('LogInToYourAccount') }}
    </a>
    <b-modal id="modal-center" centered :title="$t(toRegister?'UserRegistration':'LogInToYourAccount')">
      <form
        class="relative pl-3 pr-3"
      >
        <loading-spinner :is-loading="loading" />
        <template
          v-if="!toRegister">
          <div class="row">
            <div class="col-sm for-leave-rent">
              <div class="row mb-3">
                <base-input
                  :class="{'error-input': errorInput}"
                  type="email"
                  :placeholder="$t('Email')"
                  data-type="email"
                  @is-valid-email="validEmail"
                />
              </div>
              <div class="row">
                <base-input
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
      <template v-slot:modal-footer>
        <div class="justify-content-center place-button">
          <a class="a-login mr-3 align-middle" @click="loginOrRegister">{{$t(toRegister?'LogIn':'Registration')}}</a>
          <secodary-button class="align-self-end">
            <span>
              {{$t(toRegister?'Registration':'LogIn')}}
            </span>
          </secodary-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseInput from '~/components/elements/BaseInput'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import SecodaryButton from '~/components/elements/SecodaryButton'

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
    SecodaryButton
  },
  data () {
    return {
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
    openLogIn () {
      console.log('LogIn')
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
  .a-login-mobile {
    font-size: 18px;
    color: #fff!important;
  }
</style>
