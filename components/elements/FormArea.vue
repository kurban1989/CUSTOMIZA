<template>
  <form
    :id="id"
    :class="styleForm"
    class="relative"
    @submit.prevent="sendForm"
  >
    <loading-spinner :is-loading="loading" />
    <p :class="styleHeader">
      {{ header }}
    </p>
    <div class="row no-gutters">
      <div class="col-sm for-leave-rent">
        <div class="row">
          <base-input
            v-model="dataForm['name']"
            :value="dataForm['name']"
            :wrapper-class="inputClass"
            :placeholder="$t('How can I call you')"
            data-type="name"
            :is-clear-form="isClearForm"
          />
        </div>
        <div class="row">
          <base-input
            v-model="dataForm['email']"
            :value="dataForm['email']"
            :class="{'error-input': errorInput}"
            type="email"
            :wrapper-class="inputClass"
            :placeholder="$t('Your email')"
            data-type="email"
            :is-clear-form="isClearForm"
            @is-valid-email="validEmail"
          />
        </div>
        <div class="row">
          <base-input
            v-model="dataForm['phone']"
            :value="dataForm['phone']"
            type="phone"
            :wrapper-class="inputClass"
            :placeholder="$t('Your telephone')"
            data-type="phone"
            :is-clear-form="isClearForm"
          />
        </div>
        <template v-if="isLoadFile">
          <div class="row">
            <el-upload
              ref="upload"
              class="upload-wrapper brdr-r-5 brdr-1 pointer"
              :class="inputClass"
              drag
              action="/yandex/upload"
              :file-list="fileList"
              :on-success="handlerFile"
              :on-error="handlerErrorUpload"
              :limit="1"
              :disabled="disabledFile"
              accept="image/jpeg,image/png"
            >
              <div class="el-icon-upload" />
              <div
                class="el-upload__text"
                :class="inputClass"
              >
                {{ $t('Drop file here or click to upload') }}
              </div>
              <div v-if="fileName.length" class="el-upload__text--success">
                {{ fileName }} - {{ $t('successfully uploaded') }}
                <span class="el-upload__remove pointer" :title="$t('Remove file')" @click.stop="removeFile($event)">x</span>
              </div>
            </el-upload>
          </div>
        </template>
        <template v-if="!withoutTextArea">
          <div class="row">
            <base-area
              :wrapper-class="inputClass"
              :placeholder="$t('Your question')"
              data-type="question"
              :is-clear-form="isClearForm"
              @input="watchIntput($event, 'question')"
            />
          </div>
        </template>
      </div>
      <slot name="checkboxgroup" />
    </div>
    <div class="row">
      <primary-button type="submit">
        <div class="btn-text">
          {{ $t('Get free consultation on 1C') }}
        </div>
      </primary-button>

      <template v-if="checkboxRight">
        <base-checkbox
          :id="`${id}PersonalData`"
          :value="dataForm.isCheckedPersonalData"
          :checkbox-right="true"
          class="align-self-center checkbox-mrt personal"
          data-type="isCheckedPersonalData"
          @change="watchIntput($event, 'isCheckedPersonalData')"
        >
          {{ $t('I agree to the processing') }}
          <nuxt-link to="#">
            {{ $t('personal data') }}
          </nuxt-link>
        </base-checkbox>
      </template>
    </div>

    <template v-if="!checkboxRight">
      <div class="row">
        <base-checkbox
          :id="`${id}PersonalData`"
          class="personal"
          :value="dataForm.isCheckedPersonalData"
          data-type="isCheckedPersonalData"
          @change="watchIntput($event, 'isCheckedPersonalData')"
        >
          {{ $t('I agree to the processing') }}
          <nuxt-link to="javascript:void 0">
            {{ $t('personal data') }}
          </nuxt-link>
        </base-checkbox>
      </div>
    </template>
  </form>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Upload } from 'element-ui'
import { isClient } from '~/helpers'
import BaseInput from '~/components/elements/BaseInput'
import LoadingSpinner from '~/components/blocks/LoadingSpinner'
import BaseArea from '~/components/elements/BaseArea'
import PrimaryButton from '~/components/elements/PrimaryButton'
import BaseCheckbox from '~/components/elements/BaseCheckbox'

Vue.use(Upload)

export default {
  name: 'FormArea',
  components: {
    'el-upload': Upload,
    LoadingSpinner,
    PrimaryButton,
    BaseCheckbox,
    BaseInput,
    BaseArea
  },
  props: {
    header: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    styleForm: {
      type: String,
      required: false,
      default: 'form-white'
    },
    styleHeader: {
      type: String,
      required: false,
      default: 'header-standard'
    },
    checkboxRight: {
      type: Boolean,
      required: false,
      default: false
    },
    withoutTextArea: {
      type: Boolean,
      required: false,
      default: false
    },
    inputClass: {
      type: String,
      required: false,
      default: ''
    },
    isLoadFile: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
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
      fileList: [],
      fileName: '',
      disabledFile: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isClearForm: state => state.statusForm.clearForm
    })
  },
  watch: {
    isClearForm: {
      handler () {
        if (this.isClearForm) {
          this.removeFile()
          this.dataForm.isCheckedPersonalData = false
        }
      },
      immediate: false
    }
  },
  created () {
    this.handlerForm()
  },
  methods: {
    handlerForm () {
      if (this.user && isClient()) {
        this.dataForm.name = this.user.firstName
        this.dataForm.email = this.user.email
        this.dataForm.phone = this.user.phone
      }
    },
    handlerFile (response, file, fileList) {
      this.fileName = file.name
      this.dataForm.file = file.response.file
      this.disabledFile = true
    },
    removeFile (e) {
      if (e) {
        e.preventDefault()
        this.$refs.upload.clearFiles()
      }

      this.fileName = ''
      this.dataForm.file = null
      this.disabledFile = false
    },
    handlerErrorUpload (err) {
      this.$store.dispatch('statusForm/clearMessageError')

      if (err) {
        this.$store.dispatch('statusForm/setMessageErrorBadRequest', 'errLoadFile')
        this.$bvModal.show('bv-modal-error')
      }
    },
    sendForm () {
      this.$emit('send-form', Object.assign({}, { withoutTextArea: this.withoutTextArea }, this.dataForm))
    },
    validEmail (isEmail) {
      if (isEmail) {
        this.dataForm.errors = false
        this.errorInput = false
      } else {
        this.dataForm.errors = true
        this.errorInput = true
      }
    },
    watchIntput (data, field) {
      this.dataForm[field] = data
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/upload';
@import '~/assets/scss/border';
.error-input {
  border-color: rgb(202, 40, 40) !important;
  &.personal {
    label {
      color: red;
    }
  }
}
.note {
  font-size: 18px;
  font-weight: bold;
  margin: 0;

  &-error {
    color: rgb(202, 40, 40);
  }

  &-success {
    color: rgb(0, 107, 23);
  }
}
</style>
<style lang="scss" scoped>
.row {
  margin: 0;
  margin-bottom: 10px;
}
.no-gutters {
  margin-bottom: 0;
}
.form-white {
  width: 650px;
  background: #fff;
  padding: 40px;
  text-align: left;
  border: 1px solid #D6D6D6;
}
.form-transparent {
  background: transparent;
  padding: 0;
  border: none;
}

.header {
  margin: 0;
  padding: 0;
  font-weight: 500;

  &-standard {
    margin-bottom: 30px;
    font-size: 24px;
  }

  &-white {
    color: #fff;
    font-size: 33px;
    margin-bottom: 40px;
    line-height: 43px;
  }
}
.btn-text {
  font-size: 18px;
}
/deep/ .primary {
  width: 340px;
  height: 82px;
}
/deep/ .checkbox-right {
  color: #fff;

  &:before {
    background-color: rgba(255, 255, 255, .1);
    border-color: #D6D6D6;
  }

  &:checked + label {
    &:before {
      border-color: #D6D6D6;
    }
  }
  a {
    color: #fff;
  }
}
/deep/ .input-checkbox-right {
  &:after {
    border-color: #fff;
  }
  & + label {
    &:after {
      border-color: #fff !important;
    }
  }
  &:focus {
    + label {
      &:after {
        border-color: #fff;
      }
    }
  }
}
.checkbox-mrt {
  margin-top: 30px;
}

@media (max-width: 991px) {
  .form-white {
    width: 516px;
  }
  .checkbox-mrt {
    margin-top: 20px;
  }
}
@media (max-width: 768px) {
  label {
    margin-bottom: 0;
  }
  .header {
    &-standard {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 15px;
    }

    &-white {
      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
      margin-bottom: 20px;
    }
  }
  .form-white {
    padding: 15px;
    width: 100%;
    border-color: transparent;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #D6D6D6;
  }
  /deep/ .primary {
    width: 100%;
    height: 64px;
    margin-top: 20px;
  }
}
</style>
