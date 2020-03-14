<template>
  <div class="input-wrap brdr-r-5 brdr-1" :class="[{'focus': focus}, wrapperClass]" v-bind="$attrs">
    <input
      :autocomplete="autocomplete"
      :name="name"
      v-model="valueModel"
      :type="type"
      :disabled="disabled"
      :class="inputClass"
      :required="requiredFiled"
      @input="$emit('input', checkField(valueModel))"
      @focus="focus = true"
      @blur="() => {focus = false; checkField(valueModel, 'blur')}"
      @keyup="keyHandler($event)"
    >
    <transition name="fade">
      <label v-if="!focus && valueModel === ''" class="placeholder">
        {{ placeholder }}
      </label>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    inputClass: {
      type: String,
      required: false,
      default: ''
    },
    wrapperClass: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    validate: {
      type: Boolean,
      required: false,
      default: false
    },
    inputsTransparent: {
      type: Boolean,
      required: false,
      default: false
    },
    isClearForm: {
      type: Boolean,
      required: false,
      default: false
    },
    requiredFiled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      valueModel: this.value,
      focus: false,
      key: 0
    }
  },
  watch: {
    isClearForm: {
      handler () {
        if (this.isClearForm) {
          this.valueModel = ''
        }
      },
      immediate: false
    }
  },
  methods: {
    keyHandler (event) {
      this.key = event.keyCode
    },
    checkField (text, eventType) {
      let isValidEmail = false

      if (this.type === 'phone') {
        this.valueModel = this.beutifyPhone(text) || ''
        return this.valueModel
      } else if (this.type === 'email' && eventType === 'blur') {
        if (this.isEmail(this.valueModel) || !this.valueModel.length) {
          isValidEmail = true
        } else {
          isValidEmail = false
        }
        this.$emit('is-valid-email', isValidEmail)
      } else {
        return text
      }
    },
    beutifyPhone (val) {
      const regex = /\+?[()\-\s]{1,2}$/

      if (!val.length) {
        return false
      } else if (this.key === 8 || this.key === 229 || this.key === 46) {
        return val.replace(regex, '')
      }
      return this.formatPhone(val)
    },
    formatPhone (value) {
      value = value.replace(/[^0-9]/g, '')
      const len = value.length > 11 ? 11 : value.length
      let buf = ''

      if (value.charAt(0) === '7' || value.charAt(0) === '8') {
        value = value.substring(1, len)
      }

      for (let i = 0; i < len; i++) {
        switch (i) {
          case 3:
            buf += ') ' + value.charAt(i)
            break
          case 6:
          case 8:
            buf += '-' + value.charAt(i)
            break
          default:
            buf += value.charAt(i)
        }
      }
      buf = '+7 (' + buf
      return buf
    },
    isEmail (email) {
      const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/
      return regex.test(email)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/border';
input {
  width: 100%;
  height: 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
      &:hover,
      &:focus {
        &:before {
          border-color: gray;
          cursor: not-allowed;
        }
      }
    }
}
.input-wrap {
  width: 100%;
  position: relative;
  background: #EAEAEA;
  overflow: hidden;
  padding: 17px 20px;
  border-color: #D6D6D6;
  &.transparent {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
}
.placeholder {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #000;
  font-size: 14px;
  pointer-events: none;
}
.focus {
  box-shadow: 1px 1px 6px 1px #EAEAEA;
}
.error-input {
  border-color: #F10000 !important;
  box-shadow: unset;
}
.fade-enter-active, .fade-leave-active {
  transition-duration: .2s;
  transition-property: opacity, transform;
}
.fade-enter, .fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
