<template>
  <b-modal
    :id="id"
    :title="$t(newUser ? 'NewUser' : 'EditingUser')"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
    @hidden="close"
  >
    <b-modal id="bv-user-save-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        {{$t(messageError)}}
      </p>
    </b-modal>
    <loading-spinner :is-loading="loading" />
    <div class="row mb-3 mx-0">
      <base-input
        :class="{'error-input': errorFirstName}"
        v-model.trim="user.firstName"
        :placeholder="$t('Name')"
        type="text"
      />
    </div>
    <div class="row mb-3 mx-0">
      <base-input
        :class="{'error-input': errorLastName}"
        v-model.trim="user.lastName"
        :placeholder="$t('Surname')"
      />
    </div>
    <div class="row mb-3 mx-0">
      <base-input
        v-model="user.phone"
        :class="{'error-input': errorPhone}"
        type="phone"
        :placeholder="$t('Your telephone')"
        data-type="phone"
      />
    </div>
    <div class="row mb-3 mx-0">
      <base-input
        v-model="user.email"
        :class="{'error-input': errorEmail}"
        type="email"
        :placeholder="$t('Email')"
        data-type="email"
        @is-valid-email="validEmail"
      />
    </div>
    <div class="row mb-3 mx-0">
      <base-input
        :class="{'error-input': errorPassword}"
        autocomplete="new-password"
        v-model.trim="user.password"
        :placeholder="$t('Password')"
        type="password"
        data-type="password"
      />
    </div>
    <div class="row mx-0">
      <base-input
        :class="{'error-input': errorPasswordReplay}"
        autocomplete="new-password"
        v-model.trim="user.passwordReplay"
        :placeholder="$t('PasswordReplay')"
        type="password"
        data-type="password"
      />
    </div>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button variant="warning" @click="cancel()">
        {{ $t('Cancel') }}
      </b-button>
      <b-button variant="success" @click="save(ok)">
        {{ $t('Save') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseInput from '~/components/elements/BaseInput'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'

export default {
  name: 'UserForm',
  components: {
    BaseInput,
    LoadingSpinner
  },
  props: {
    id: {
      type: String,
      required: false,
      default: 'user-edit-modal'
    },
    user: {
      type: Object,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordReplay: ''
      }
    },
    newUser: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      loading: 'users/loading',
      statuses: 'users/statuses',
      roles: 'users/roles'
    })
  },
  data () {
    return {
      messageError: 'checkForm',
      errorEmail: false,
      errorPassword: false,
      errorPasswordReplay: false,
      errorFirstName: false,
      errorLastName: false,
      errorPhone: false
    }
  },
  methods: {
    save (ok) {
      this.errorPhone = !this.user.phone || this.user.phone.length < 18
      this.errorFirstName = !this.user.firstName || this.user.firstName === ''
      this.errorLastName = !this.user.lastName || this.user.lastName === ''
      this.errorEmail = !this.user.email || this.errorEmail || this.user.email === ''
      if (this.newUser) {
        this.errorPassword = !this.user.password || this.user.password.length < 6
        this.errorPasswordReplay = !this.user.passwordReplay || this.user.passwordReplay.length < 6 || this.user.passwordReplay !== this.user.password
      } else {
        this.errorPassword = this.user.password && this.user.password.length < 6
        this.errorPasswordReplay = this.user.password && ((this.user.passwordReplay && this.user.passwordReplay.length < 6) || this.user.passwordReplay !== this.user.password)
      }
      const error = this.errorPhone || this.errorFirstName || this.errorLastName || this.errorEmail
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
        this.$bvModal.show('bv-user-save-error')
        return false
      }
      this.$store.dispatch('users/saveUser', this.user).then((res) => {
        if (res.data.status === 'ERROR') {
          this.messageError = res.data.message
          this.$bvModal.show('bv-user-save-error')
        } else {
          ok()
        }
      }).catch(() => {
        this.messageError = 'checkForm'
        this.$bvModal.show('bv-user-save-error')
      })
    },
    close () {
      this.errorPhone = false
      this.errorFirstName = false
      this.errorLastName = false
      this.errorEmail = false
      this.errorPassword = false
      this.errorPasswordReplay = false
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

<style scoped>

</style>
