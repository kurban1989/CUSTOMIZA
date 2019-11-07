<template>
  <div class="relative" v-bind="$attrs">
    <input
      :id="id"
      class="no-outline"
      :class="{'input-checkbox-right': checkboxRight}"
      type="checkbox"
      :checked="value"
      :disabled="disabled"
      @keyup.enter="$emit('click')"
      @click="$emit('click')"
      @blur="$emit('blur')"
      @change="$emit('change', $event.target.checked)"
    >
    <label
      class="pointer brdr-r-5"
      :class="{'checkbox-right': checkboxRight}"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    checkboxRight: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  user-select: none;
  display: block;
  color: #000;
  font-size: 14px;
  padding-top: 2px;
  padding-left: 31px;
  &:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 21px;
    height: 21px;
    background-color: transparent;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    cursor: pointer;
  }

  a {
    color: #ACA9A9;
    text-decoration: underline;
  }
}

input {
  position: absolute;
  top: 3px;
  left: 0;
  opacity: 0;
  &:checked + label {
    &:before {
      cursor: pointer;
    }
    &:after {
      content: '';
      position: absolute;
      top: 8px;
      left: 5px;
      width: 12px;
      height: 7px;
      border: 2px solid #709e3a;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
  }
  &:hover,
  &:focus {
    + label {
      &:before {
        border-color: #D6D6D6;
      }
    }
  }
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
</style>
