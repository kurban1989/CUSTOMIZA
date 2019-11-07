<template>
  <div class="mobile-menu__phone-area brdr-r-5">
    <div class="mobile-menu__icon-call flex">
      <a href="tel:+78005005050" class="mobile-menu__link-call">
        8 (800) 500-50-50
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhoneCallBlock'
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/border';
.mobile-menu {
  &__icon-call {
    width: 100%;
    height: 42px;
    padding-left: 62px;
    background-image: url('~assets/icon/phone-call.svg');
    background-repeat: no-repeat;
    background-position: top left;
    align-items: center;
  }

  &__link-call {
    font-size: 24px;
    line-height: 28px;
    color: #fff;
    font-weight: 500;
    vertical-align: middle;
  }

  &__phone-area {
    width: 100%;
    max-width: 310px;
    border: 1px solid #fff;
    padding: 16px 26px;
    padding-right: 0;
    margin-bottom: 12px;
  }
}
</style>
