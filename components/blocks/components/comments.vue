<template>
  <div class="container relative">
    <confirmation-dialog id="delete-confirmation-comment" body="DeleteConfirmComment" @ok="onDelete" />
    <b-modal id="bv-add-succes" :title="$t('sm')" ok-only>
      <p class="note note-success">
        {{ $t('Your comment') }}&nbsp;{{ $t('successfully saved') }}
      </p>
    </b-modal>
    <loading-spinner :is-loading="isSave" />

    <h2 class="comment__section-title mb-4">
      {{ $t('comments') | capitalize }}&nbsp;
      <span>
        {{ count }}
      </span>
    </h2>
    <template v-if="comments.length">
      <list-comments v-for="comm in comments" :key="comm.id" :list="comm" :is-loggined="isShowFormComment" @on-delete="preDelete" />
      <hr>
    </template>

    <template v-if="isShowFormComment">
      <div class="comment--head">
        {{ $t('leave') | capitalize }}&nbsp;{{ $t('Your comment') }} <span>{{ user.firstName }}</span>
      </div>
      <div class="row mt-2 mb-2">
        <base-area
          v-model.trim="comment"
          wrapper-class="w-100"
          :placeholder="$t('Your comment')"
          data-type="question"
          :is-clear-form="isClearForm"
        />
      </div>
      <div class="row mb-3">
        <g-recaptcha :error="errorRecaptchaToken" @expired="onVerify" @verify="onVerify" />
      </div>
      <div class="row mb-3">
        <primary-button class="justify-self-end" @click="addComment">
          {{ $t('add') | capitalize }}
        </primary-button>
      </div>
    </template>
    <p v-else class="relative mt-5 mb-5 comment--user-only">
      {{ $t('onlyUsers') }}&nbsp;<span class="comment--user-enter" @click="openLogIn">{{ $t('LogOrReg') }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from '~/helpers'
import BaseArea from '~/components/elements/BaseArea'
import PrimaryButton from '~/components/elements/PrimaryButton'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import ListComments from '~/components/blocks/components/ListComments'
import ConfirmationDialog from '~/components/elements/ConfirmationDialog'
import GRecaptcha from '~/components/elements/GRecaptcha'

export default {
  name: 'Comments',
  components: {
    ConfirmationDialog,
    GRecaptcha,
    LoadingSpinner,
    PrimaryButton,
    ListComments,
    BaseArea
  },
  props: {
    id: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      required: true
    },
    uid: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      required: true
    },
    count: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      comment: '',
      errorRecaptchaToken: null,
      recaptchaToken: null,
      isClearForm: false,
      isSave: false,
      deleteComment: null
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      comments: state => state.directory.comments,
      isLogged: state => state.auth.loggedIn
    }),
    isShowFormComment () {
      return this.isLogged && !isEmpty(this.user)
    }
  },
  methods: {
    onDelete () {
      if (this.deleteComment) {
        this.isSave = true

        this.$axios.post('api/comments/delete', {
          isLogin: true,
          uid: this.uid,
          low: true,
          idComment: this.deleteComment
        }).then(async (res) => {
          this.isSave = false
          const comments = await this.$axios.get(`api/comments/get/${this.$route.params.uid}`)
          this.$store.dispatch('directory/setComments', comments)
        }).finally(() => {
          this.isSave = false
        })
      }
    },
    preDelete (id) {
      this.deleteComment = id
    },
    openLogIn () {
      this.$bvModal.show(this.mobile ? 'login-modal-mobile' : 'login-modal')
    },
    addComment () {
      this.errorRecaptchaToken = !this.recaptchaToken

      if (this.comment.length < 2 || this.errorRecaptchaToken) {
        return false
      }
      this.isSave = true
      this.isClearForm = true

      this.$axios.post('api/comments/add', {
        comment: this.comment,
        idUser: this.user.id,
        idArticle: this.id,
        uid: this.uid,
        user: `${this.user.firstName}`
      }).then(async (res) => {
        this.$bvModal.show('bv-add-succes')
        this.isSave = false
        this.isClearForm = false
        const comments = await this.$axios.get(`api/comments/get/${this.$route.params.uid}`)
        this.$store.dispatch('directory/setComments', comments)
      }).finally(() => {
        this.isClearForm = false
        this.isSave = false
      })
    },
    onVerify (response) {
      this.errorRecaptchaToken = !response
      this.recaptchaToken = response
    }
  }
}
</script>
<style lang="scss" scoped>
.comment {
  &--user-only {
    margin: 40px 0;
    padding: 26px 20px;
    border: 1px solid #e4e8ea;
    font-size: 15px;
    line-height: 1.5;

    &:before {
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      width: 4px;
      background: #93b520;
      content: '';
    }
  }

  &__section-title {
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #444;
    font-weight: 500;
    font-size: 22px;
    line-height: 40px;
    border-bottom: 1px dashed #e5e5e5;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 22px;
      line-height: 20px;
      border: none;
    }

    span {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2fc203;
      letter-spacing: 1.09px;
      font-weight: 500;
      font-size: 22px;

      @media (max-width: 768px) {
        font-size: 20px;
        line-height: 18px;
      }
    }
  }

  &--head {
    font-size: 18px;
    font-weight: 500;

    span {
      color: #81a705;
    }

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  &--user-enter {
    cursor: pointer;
    color: #4e6600;
    transition: color .2s linear;

    &:hover {
      color: rgb(112, 139, 22);
    }
  }
}
</style>
