<template>
  <div class="container relative">
    <b-modal id="bv-art-success" :title="$t('sm')" ok-only>
      <p class="note note-success">
        &nbsp;{{ $t(messageArt) }}
      </p>
    </b-modal>

    <loading-spinner :is-loading="loading" />
    <div class="row no-gutters header header-ed">
      <nuxt-link :to="localePath({ path: '/' })" class="logo logo-ed bg-standart-options col-3 col-md-2" />
      <div class="row col-lg-9 col-md-10 col-9 offset-lg-1 menu-group align-self-center">
        <ul class="col no-gutters flex justify-content-lg-start justify-content-end align-items-center">
          <li
            v-for="(item, index) in articleMenu"
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

    <div class="row f-column mt-3 mb-3">
      <h3 class="col mb-2">
        {{ $t('Header article') }}
      </h3>
      <div class="col mb-2">
        <base-input
          v-model="titleArt"
          :class="{'error-input': error}"
          :placeholder="$t('Header article')"
          :value="titleArt"
        />
      </div>
    </div>

    <editor
      ref="tinymce"
      api-key="wges5be2ypr42zqkjmr7ffghnhkog4b62w7xe2jtnprzni5j"
      :init="{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
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

    <br>

    <b-form-group class="row m-2" label="Язык статьи:">
      <b-form-radio v-model="lang" class="col" name="radios" value="ru">
        РУССКИЙ
      </b-form-radio>
      <b-form-radio v-model="lang" class="col" name="radios" value="en">
        ENGLISH
      </b-form-radio>
      <div class="mt-3 col">
        Selected: <strong>{{ lang }}</strong>
      </div>
    </b-form-group>

    <hr>

    <div class="row mx-1 mt-3 justify-content-between">
      <base-checkbox
        id="nowPost"
        v-model="nowPost"
        :value="false"
        class="align-self-center checkbox-mrt justify-self-start"
      >
        {{ $t('Post right away') }}
      </base-checkbox>

      <secodary-button class="align-self-end  justify-self-end" @click="save">
        <span>
          {{ $t('save') }}
        </span>
      </secodary-button>
    </div>
    <hr>
    <footer-site />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import SwitcherLang from '~/components/blocks/SwitcherLang'
import LogIn from '~/components/blocks/LogIn'
import SecodaryButton from '~/components/elements/SecodaryButton.vue'
import articleMenu from '~/resourse/articleMenu.json'
import BaseInput from '~/components/elements/BaseInput'
import BaseCheckbox from '~/components/elements/BaseCheckbox'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import FooterSite from '~/components/FooterSite'
import { binary, isEmpty } from '~/helpers'

export default {
  name: 'Edit',
  components: {
    SwitcherLang,
    LoadingSpinner,
    SecodaryButton,
    BaseCheckbox,
    BaseInput,
    FooterSite,
    Editor,
    LogIn
  },
  data () {
    return {
      titleArt: '',
      error: false,
      nowPost: false,
      loading: false,
      lang: 'ru',
      messageArt: 'Article successfully saved',
      editorContent: '<p>Hello world!</p>',
      articleMenu
    }
  },
  watch: {
    '$route' () {
      if (isEmpty(this.$route.query) || !this.$route.query.uid) {
        const tinymce = this.$refs.tinymce
        this.titleArt = ''
        this.lang = 'ru'
        this.nowPost = false
        this.editorContent = '<p>Hello world!</p>'
        tinymce.editor.setContent(this.editorContent)
        this.uid = null
      }
    }
  },
  async asyncData ({ query, params, $axios }) {
    let post = null
    if (query.uid) {
      post = await $axios.get(`api/articles/get/${query.uid}`)
    }

    return {
      uid: query.uid || null,
      post: post ? post.data.data : post
    }
  },
  middleware: ['auth', 'notUser'],
  beforeMount () {
    if (this.post) {
      this.titleArt = this.post.title
      this.lang = this.post.lang
      this.nowPost = Boolean(this.post.visible)
      this.editorContent = binary.fromBinary(atob(this.post.text))
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

      if (this.titleArt.length < 2) {
        this.error = true
        this.loading = false
        return
      }

      this.$axios.post('api/articles/save',
        {
          title: this.titleArt.trim(),
          visible: Number(this.nowPost),
          author: `${this.$auth.user.firstName} ${this.$auth.user.lastName}`,
          uid: this.$data.uid,
          lang: this.lang,
          text
        }
      ).then((result) => {
        this.loading = false
        if (this.$data.uid) {
          this.messageArt = 'Article updated successfully'
        }
        this.$data.uid = result.data.data.uid
        this.$bvModal.show('bv-art-success')
        this.$router.push(`/articles/edit?uid=${result.data.data.uid}`)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss">
.header-ed {
  padding: 20px 0;
  align-items: center;
}
.personal-area {
  justify-content: flex-end;
}
.logo-ed {
  height: 70px;
  background-position: left;
}
</style>
