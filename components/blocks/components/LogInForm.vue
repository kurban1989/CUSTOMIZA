<template>
  <div>
    <b-dropdown
      v-if="$auth.$state.loggedIn"
      size="sm"
      right
      :text="$auth.user.lastName + ' ' + $auth.user.firstName"
      variant="dropdown-user"
      :class="{'font-mobile-style': mobile}"
    >
      <b-dropdown-header>{{$t($auth.user.roleName)}}</b-dropdown-header>
      <b-dropdown-divider></b-dropdown-divider>
      <template v-for="(item, index) in userMenu">
        <b-dropdown-item v-if="item[$auth.user.roleName]" :key="index" :title="$t(item.hint)" :to="item.link">{{ $t(item.title) }}</b-dropdown-item>
      </template>
      <b-dropdown-divider></b-dropdown-divider>
      <div class="mx-2 ">
        <primary-button @click="$auth.logout()" class="button-logout">{{ $t('LogOut') }}</primary-button>
      </div>
    </b-dropdown>
    <template v-else>
      <a class="a-login" :class="{'font-mobile-style': mobile}" @click="openLogIn">
        {{ $t('LogInToYourAccount') }}
      </a>
      <b-modal :ref="mobile ? 'login-modal-mobile' : 'login-modal'" hide-footer centered :title="$t(toRegister?'UserRegistration':'LogInToYourAccount')">
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
                    :class="{'error-input': errorEmail}"
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
                    autocomplete="new-password"
                    v-model="registration.firstName"
                    :placeholder="$t('Name')"
                    type="text"
                    data-type="firstName"
                  />
                </div>
                <div class="row mb-3">
                  <base-input
                    autocomplete="new-password"
                    v-model="registration.lastName"
                    :placeholder="$t('Surname')"
                  />
                </div>
                <div class="row mb-3">
                  <base-input
                    v-model="registration.phone"
                    type="phone"
                    :placeholder="$t('Your telephone')"
                    data-type="phone"
                  />
                </div>
                <div class="row mb-3">
                  <base-input
                    v-model="registration.email"
                    :class="{'error-input': errorEmail}"
                    type="email"
                    :placeholder="$t('Email')"
                    data-type="email"
                    @is-valid-email="validEmail"
                  />
                </div>
                <div class="row mb-3">
                  <base-input
                    autocomplete="new-password"
                    v-model="registration.password"
                    :placeholder="$t('Password')"
                    type="password"
                    data-type="password"
                  />
                </div>
                <div class="row">
                  <base-input
                    autocomplete="new-password"
                    v-model="registration.passwordReplay"
                    :placeholder="$t('PasswordReplay')"
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
      </b-modal>
    </template>
  </div>
</template>

<!--<script>-->
<!--  import BaseInput from '~/components/elements/BaseInput'-->
<!--  import LoadingSpinner from '~/components/blocks/LoadingSpinner'-->
<!--  import SecodaryButton from '~/components/elements/SecodaryButton'-->
<!--  import PrimaryButton from '~/components/elements/PrimaryButton'-->
<!--  import userMenu from '~/resourse/userMenu.json'-->

<!--  export default {-->
<!--    name: 'LogIn',-->
<!--    props: {-->
<!--      mobile: {-->
<!--        type: Boolean,-->
<!--        required: false,-->
<!--        default: false-->
<!--      }-->
<!--    },-->
<!--    components: {-->
<!--      BaseInput,-->
<!--      LoadingSpinner,-->
<!--      SecodaryButton,-->
<!--      PrimaryButton-->
<!--    },-->
<!--    data () {-->
<!--      return {-->
<!--        userMenu,-->
<!--        user: {-->
<!--          login: '',-->
<!--          password: ''-->
<!--        },-->
<!--        registration: {-->
<!--          lastName: '',-->
<!--          firstName: '',-->
<!--          phone: '',-->
<!--          email: '',-->
<!--          password: '',-->
<!--          passwordReplay: ''-->
<!--        },-->
<!--        errorEmail: false,-->
<!--        loading: false,-->
<!--        toRegister: false-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      openLogIn () {-->
<!--        this.$refs[this.mobile ? 'login-modal-mobile' : 'login-modal'].show()-->
<!--      },-->
<!--      loginOrRegister () {-->
<!--        this.toRegister = !this.toRegister-->
<!--      },-->
<!--      login () {-->
<!--        this.loading = true-->
<!--        this.$auth.loginWith('local', { data: this.user }).then(() => {-->
<!--          this.$refs['login-modal'].hide()-->
<!--        }).catch((err) => {-->
<!--          console.log(err)-->
<!--        }).finally(() => {-->
<!--          this.loading = false-->
<!--        })-->
<!--        // try {-->
<!--        //   this.loading = true;-->
<!--        //   await this.$auth.loginWith('local', { data: this.user })-->
<!--        //   this.$refs['login-modal'].hide()-->
<!--        //   this.loading = false;-->
<!--        // } catch (err) {-->
<!--        //   console.log(err)-->
<!--        // }-->
<!--      },-->
<!--      validEmail (isEmail) {-->
<!--        if (isEmail) {-->
<!--          this.errorEmail = false-->
<!--        } else {-->
<!--          this.errorEmail = true-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .a-login {-->
<!--    font-size: 14px;-->
<!--    color: #000 !important;-->
<!--    text-decoration: none;-->
<!--    cursor: pointer;-->
<!--    &:hover {-->
<!--      text-decoration: underline !important;-->
<!--    }-->
<!--  }-->
<!--  .btn-dropdown-user {-->
<!--    padding: 0 !important;-->
<!--    background: inherit;-->
<!--    border: 0;-->
<!--    color: #000;-->
<!--  }-->
<!--  .button-logout {-->
<!--    min-height: 20px !important;-->
<!--    height: 40px !important;-->
<!--    width: 100% !important;-->
<!--    line-height: 1 !important;-->
<!--    padding: 10px !important;-->
<!--  }-->
<!--  .font-mobile-style {-->
<!--    font-size: 18px;-->
<!--    color: #fff!important;-->
<!--    .btn-dropdown-user {-->
<!--      font-size: 18px;-->
<!--      color: #fff!important;-->
<!--    }-->
<!--  }-->
<!--</style>-->
