<template>
  <footer class="container relative">
    <div class="row no-gutters footer justify-content-md-start justify-content-sm-center">
      <nuxt-link :to="localePath({ path: '/' })" class="logo bg-standart-options col-md-2" />
      <div class="col-md-8 offset-md-1 align-self-center second-col">
        <p class="rights">
          {{ $t('© All rights reserved.') }}
        </p>
        <p>
          {{ $t('footerText') }}
        </p>
      </div>
      <div class="col-md-1">
        &nbsp;
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSite'
}
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
  line-height: 17px;
}
.footer {
  height: 170px;
  padding: 35px 0;
}
.rights {
  color: #ACA9A9;
  margin-bottom: 10px;
}
@media (max-width: 768px) {
  .second-col {
    text-align: center;
    padding-top: 18px;
  }
}
</style>
