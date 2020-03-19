<template>
  <div class="d-inline p-1" :class="{'error': error}">
    <vue-recaptcha
      @verify="onVerify"
      @expired="onExpired"
      ref="recaptcha"
      :loadRecaptchaScript="true"
      :sitekey="sitekey">
    </vue-recaptcha>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'recaptcha',
  comments: {
    VueRecaptcha
  },
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      sitekey: '6Lc8dOIUAAAAAMVnPnhMBYSxEA3o7oCCKMaT7OvI'
    }
  },
  methods: {
    onVerify (response) {
      this.$emit('verify', response)
    },
    onExpired () {
      this.$emit('expired')
      this.$refs.recaptcha.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  border: 1px solid #F10000 !important;
  box-shadow: unset;
}
</style>
