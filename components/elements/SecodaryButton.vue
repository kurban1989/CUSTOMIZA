<template>
  <button class="secondary" v-bind="$attrs" :type="type" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SecondaryButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.secondary{
  border-radius: 8px;
  color: #fff;
  border: none;
  outline: none;
  padding: 0.15em 1.3em;
  min-height: 50px;
  background: rgb(141,187,87);
  background: -moz-linear-gradient(180deg, rgba(141,187,87,1) 0%, rgba(107,150,56,1) 43%);
  background: -webkit-linear-gradient(180deg, rgba(141,187,87,1) 0%, rgba(107,150,56,1) 43%);
  background: linear-gradient(180deg, rgba(141,187,87,1) 0%, rgba(107,150,56,1) 43%);
  transition-property: background;
  transition-duration: .3s;
  transition-timing-function: ease-in-out;

  &:hover {
    background: rgb(141,187,87);
    background: -moz-linear-gradient(180deg, rgba(141,187,87,1) 0%, rgb(78, 110, 40) 50%);
    background: -webkit-linear-gradient(180deg, rgba(141,187,87,1) 0%, rgb(78, 110, 40) 50%);
    background: linear-gradient(180deg, rgba(141,187,87,1) 0%, rgb(78, 110, 40) 50%);
  }

  &:active {
    background: rgb(64,100,22);
    background: -moz-linear-gradient(180deg, rgb(78, 110, 40) 0%, rgba(138,184,85,1) 50%);
    background: -webkit-linear-gradient(180deg, rgb(78, 110, 40) 0%, rgba(138,184,85,1) 50%);
    background: linear-gradient(180deg, rgb(78, 110, 40) 0%, rgba(138,184,85,1) 50%);
  }
}
</style>
