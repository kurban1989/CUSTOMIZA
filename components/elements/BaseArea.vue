<template>
  <div class="input-wrap brdr-r-5 brdr-1" :class="[{'focus': focus}, wrapperClass]" v-bind="$attrs">
    <transition name="fade">
      <label v-if="!focus && valueModel === ''" class="placeholder">
        {{ placeholder }}
      </label>
    </transition>
    <textarea
      v-model="valueModel"
      :disabled="disabled"
      :class="inputClass"
      @input="$emit('input', valueModel)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseArea',
  props: {
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
    validate: {
      type: Boolean,
      required: false,
      default: false
    },
    isClearForm: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      valueModel: this.value,
      focus: false
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
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/border';
textarea {
  width: 100%;
  min-height: 80px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  resize: none;
  &:disabled + label {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
    &:hover,
    &:focus {
      &:before {
        cursor: not-allowed;
      }
    }
  }
}
.input-wrap {
  width: 650px;
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
  top: 20px;
  left: 20px;
  color: #000;
  font-size: 15px;
  pointer-events: none;
}
.fade-enter-active, .fade-leave-active {
  transition-duration: .2s;
  transition-property: opacity, transform;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-100%)
}
.focus {
  box-shadow: 1px 1px 7px 1px #EAEAEA;
}
</style>
