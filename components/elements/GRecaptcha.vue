<template>
  <div class="d-inline p-1" :class="{'error': error}">
    <vue-recaptcha
      ref="recaptcha"
      :load-recaptcha-script="true"
      :sitekey="sitekey"
      @verify="onVerify"
      @expired="onExpired"
    />
    <span v-if="error">{{ $t('ErrorCaptcha') }}</span>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'GRecaptcha',
  components: {
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
      // local host
      // sitekey: '6Lc8dOIUAAAAAMVnPnhMBYSxEA3o7oCCKMaT7OvI'
      sitekey: '6LepeIIUAAAAABPqWNU5ZqbRRVL5C6CoBnhYoj95'
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
  span {
    color: #F10000 !important;
    font-size: 14px !important;
  }
}
</style>
