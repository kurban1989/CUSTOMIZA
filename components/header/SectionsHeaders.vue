<template>
  <h2 v-bind="$attrs" class="h2 relative">
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: 'SectionsHeaders',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.h2 {
  margin: 0;
  padding: 0;
  font-size: 34px;
  margin-bottom: 90px;
  &:before {
    content: '';
    width: 127px;
    height: 1px;
    background: #6B9638;
    position: absolute;
    top: 51%;
    left: -157px;
  }
}

@media (max-width: 991px) {
  .h2 {
    margin-bottom: 70px;
  }
}
@media (max-width: 767px) {
  .h2 {
    font-size: 18px;
    margin-bottom: 30px;
     &:before {
      content: none;
    }
  }
}
</style>
