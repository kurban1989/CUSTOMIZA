<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    class="primary"
    v-bind="$attrs"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    href: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Boolean,
      required: false,
      default: false
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
.primary{
  background: rgb(229,179,16);
  background: -moz-linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(212,131,40,1) 100%);
  background: -webkit-linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(212,131,40,1) 100%);
  background: linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(212,131,40,1) 100%);
  border-radius: 7px;
  color: #fff;
  border-color: transparent;
  border-top: none;
  border-bottom: 3px solid #b98e02;
  outline: none;
  padding: 0.15em 1.3em;
  min-height: 56px;

  &:hover {
    background: rgb(229,179,16);
    background: -moz-linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(179,110,26,1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(179,110,26,1) 100%);
    background: linear-gradient(180deg, rgba(229,179,16,1) 0%, rgba(179,110,26,1) 100%);
    border-bottom: 2px solid rgba(179,110,26,1);
  }

  &:active {
    background: rgb(179,109,26);
    background: -moz-linear-gradient(180deg, rgba(179,109,26,1) 0%, rgba(228,178,16,1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(179,109,26,1) 0%, rgba(228,178,16,1) 100%);
    background: linear-gradient(180deg, rgba(179,109,26,1) 0%, rgba(228,178,16,1) 100%);
    border-bottom: 3px solid #b98e02;
  }
}
.a-link-btn {
  display: flex;
  align-items: center;
  text-align: center;
  &:hover {
    text-decoration: none;
  }
}
</style>
