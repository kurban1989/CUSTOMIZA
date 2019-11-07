<template>
  <div class="icon brdr-circle" v-bind="$attrs" :style="backgroundColor.length ? `background-color: ${backgroundColor};` : ''" />
</template>
<script>
export default {
  name: 'IconPosts',
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/border';
.icon {
  width: 100px;
  height: 100px;
  background-color: #F5F5F5;
  background-image: url('~assets/icon/icon-post.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
