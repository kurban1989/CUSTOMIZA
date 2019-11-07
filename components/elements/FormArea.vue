<template>
  <form :id="id" :class="styleForm" class="relative" @submit.prevent="sendForm">
    <p :class="styleHeader">
      {{ header }}
    </p>
    <div class="row no-gutters">
      <div class="col-sm for-leave-rent">
        <div class="row">
          <base-input
            :wrapper-class="inputClass"
            :placeholder="$t('How can I call you')"
            @input="watchIntput($event, 'name')"
          />
        </div>
        <div class="row">
          <base-input
            :class="{'error-input': errorInput}"
            type="email"
            :wrapper-class="inputClass"
            :placeholder="$t('Your email')"
            @input="watchIntput($event, 'email')"
            @is-valid-email="validEmail"
          />
        </div>
        <div class="row">
          <base-input
            type="phone"
            :wrapper-class="inputClass"
            :placeholder="$t('Your telephone')"
            @input="watchIntput($event, 'phone')"
          />
        </div>
        <template v-if="!withoutTextArea">
          <div class="row">
            <base-area
              :wrapper-class="inputClass"
              :placeholder="$t('Your question')"
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
          class="align-self-center checkbox-mrt"
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
          :value="dataForm.isCheckedPersonalData"
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
import BaseInput from '~/components/elements/BaseInput'
import BaseArea from '~/components/elements/BaseArea'
import PrimaryButton from '~/components/elements/PrimaryButton'
import BaseCheckbox from '~/components/elements/BaseCheckbox'

export default {
  name: 'FormArea',
  components: {
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
        errors: false
      },
      errorInput: false
    }
  },
  methods: {
    sendForm () {
      this.$emit('send-form', Object.assign({}, this.dataForm, { withoutTextArea: this.withoutTextArea }))
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
    margin-bottom: 56px;
    line-height: 44px;
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
