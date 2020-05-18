<template>
  <div class="container relative">
    <b-modal id="bv-case-success" :title="$t('sm')" ok-only>
      <p class="note note-success">
        &nbsp;{{ $t(message) }}
      </p>
    </b-modal>
    <b-modal id="bv-modal-error" :title="$t('sm')" ok-only>
      <p class="note note-error">
        {{ $t('checkForm') }}
      </p>
    </b-modal>

    <div class="row no-gutters header header-ed">
      <nuxt-link :to="localePath({ path: '/' })" class="logo logo-ed bg-standart-options col-3 col-md-2" />
      <div class="row col-lg-9 col-md-10 col-9 offset-lg-1 menu-group align-self-center">
        <ul class="col no-gutters flex justify-content-lg-start justify-content-end align-items-center">
          <li
            v-for="(item, index) in caseMenu"
            :key="index"
            class="link item-menu"
            :title="item.hint"
          >
            <nuxt-link :to="localePath({ path: `/${item.link}`})" class="a-link">
              {{ $t(item.title) }}
            </nuxt-link>
          </li>
        </ul>
        <div class="row col-sm-7 col-md-5 col-lg-5 col-xl-4 personal-area only-desktop">
          <log-in />
          <switcher-lang />
        </div>
      </div>
    </div>

    <hr>

    <div class="row f-column mt-5 mb-3">
      <h4 class="col mb-2">
        {{ $t('Short title') }}
      </h4>
      <div class="col mb-2">
        <base-input
          v-model="shortTitle"
          :class="{'error-input': error}"
          :placeholder="$t('Short title')"
          :value="shortTitle"
        />
      </div>

      <h4 class="col mb-2">
        {{ $t('Question') }}
      </h4>
      <div class="col mb-2">
        <base-area
          v-model.trim="question"
          wrapper-class="w-100"
          :class="{'error-input': error}"
          :placeholder="$t('Question')"
          :value="question"
          data-type="question"
        />
      </div>

      <h4 class="col mb-2">
        Заказчик / клиент
      </h4>
      <div class="col mb2">
        <base-input
          v-model="customer"
          :value="customer"
        />
      </div>

      <h4 class="col mt-3 mb-2">
        Текст ответа
      </h4>
      <div class="col mt-1 mb-2">
        <editor
          ref="tinymce"
          api-key="wges5be2ypr42zqkjmr7ffghnhkog4b62w7xe2jtnprzni5j"
          :init="{
            height: 490,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            file_picker_types: 'image',
            file_picker_callback,
            images_upload_url: '/yandex/upload',
            images_upload_handler,
            setup: function (editor) {
              editor.on('init', function (e) {
                editor.setContent(editorContent);
              });
            }
          }"
        />
      </div>

      <h4 class="col w-100 justify-self-center mt-3 mb-2">
        {{ $t('Date of the application') }}
      </h4>
      <div class="col w-100 justify-self-center mt-2 mb-3">
        <el-date-picker
          v-model="dateOfApp"
          type="date"
          :placeholder="$t('Date of the application')"
          :class="{'error-input': error}"
        />
      </div>

      <div class="row mx-1 mt-2 justify-content-between">
        <base-checkbox
          id="nowPost"
          v-model="nowPost"
          :value="false"
          class="align-self-center checkbox-mrt justify-self-start"
        >
          {{ $t('Post right away') }}
        </base-checkbox>
        <primary-button @click="save">
          {{ post ? $t('save') : $t('add') }}
        </primary-button>
      </div>
    </div>

    <hr>
    <footer-site />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { DatePicker } from 'element-ui'
import SwitcherLang from '~/components/blocks/SwitcherLang'
import LogIn from '~/components/blocks/LogIn'
import BaseInput from '~/components/elements/BaseInput'
import BaseArea from '~/components/elements/BaseArea'
import BaseCheckbox from '~/components/elements/BaseCheckbox'
import PrimaryButton from '~/components/elements/PrimaryButton'
import FooterSite from '~/components/FooterSite'
import caseMenu from '~/resourse/caseMenu.json'
import { binary, isEmpty } from '~/helpers'
import casesMixin from '~/mixins/cases'

export default {
  name: 'CasesEdit',
  middleware: ['auth', 'notUser'],
  components: {
    'el-date-picker': DatePicker,
    LogIn,
    SwitcherLang,
    PrimaryButton,
    BaseCheckbox,
    BaseArea,
    BaseInput,
    FooterSite,
    Editor
  },
  mixins: [casesMixin],
  data () {
    return {
      caseMenu,
      shortTitle: '',
      question: '',
      customer: '',
      dateOfApp: '',
      editorContent: '<p>Здесь необходимо сделать краткое, но интересное описание решённого кейса <b>вопросов от клиентов</b></p>',
      error: false,
      nowPost: false,
      loading: false,
      message: 'Case created successfully'
    }
  },
  watch: {
    '$route' () {
      if (isEmpty(this.$route.query) || !this.$route.query.id) {
        const tinymce = this.$refs.tinymce
        this.shortTitle = ''
        this.customer = ''
        this.question = ''
        this.dateOfApp = ''
        this.nowPost = false
        this.editorContent = '<p></p>'
        tinymce.editor.setContent(this.editorContent)
        this.id = null
      }
    }
  },
  async asyncData ({ query, $axios }) {
    let post = null
    if (query.id) {
      post = await $axios.get(`api/cases/get/${query.id}`)
    }

    return {
      id: query.id || null,
      post: post ? post.data.data : post
    }
  },
  beforeMount () {
    if (this.post) {
      this.shortTitle = this.post.short_title
      this.customer = this.post.customer
      this.question = this.post.question
      this.dateOfApp = this.post.date_of_application
      this.nowPost = Boolean(this.post.visible)
      this.editorContent = binary.fromBinary(atob(this.post.answer))
    }
  },
  methods: {
    file_picker_callback (cb, value, meta) {
      const input = document.createElement('input')
      const tinymce = this.$refs.tinymce
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')

      input.onchange = function () {
        const file = this.files[0]

        const reader = new FileReader()
        reader.onload = function () {
          /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */
          const id = 'blobid' + (new Date()).getTime()
          const blobCache = tinymce.editor.editorUpload.blobCache
          const base64 = reader.result.split(',')[1]
          const blobInfo = blobCache.create(id, file, base64)
          blobCache.add(blobInfo)

          /* call the callback and populate the Title field with the file name */
          cb(blobInfo.blobUri(), { title: file.name })
        }
        reader.readAsDataURL(file)
      }

      input.click()
    },
    images_upload_handler (blobInfo, success, failure) {
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', '/yandex/upload')

      xhr.onload = function () {
        let json

        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status)
          return
        }

        // eslint-disable-next-line prefer-const
        json = JSON.parse(xhr.responseText)

        if (!json || typeof json.location !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          return
        }

        success(json.location)
      }

      const formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      formData.append('silent', true)

      xhr.send(formData)
    },
    save () {
      this.loading = true
      this.error = false
      const tinymce = this.$refs.tinymce
      const text = btoa(binary.toBinary(tinymce.editor.getContent()))

      if (this.shortTitle.length < 2 || this.question.length < 3) {
        this.error = true
        this.$bvModal.show('bv-modal-error')
        this.loading = false
        return
      }

      this.$axios.post('api/cases/add',
        {
          id: this.$route.query.id || null,
          shortTitle: this.shortTitle.trim(),
          question: this.question,
          answer: text,
          customer: this.customer,
          visible: Number(this.nowPost),
          dateOfApplication: this.dateOfApp,
          author: `${this.$auth.user.firstName} ${this.$auth.user.lastName}`
        }
      ).then((result) => {
        this.loading = false
        if (this.$data.id) {
          this.message = 'Case updated successfully'
        }
        this.$data.id = result.data.data.id
        this.$bvModal.show('bv-case-success')
        this.$router.push(`/case/add-edit?id=${result.data.data.id}`)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="css">
@import url("//unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css");
</style>
