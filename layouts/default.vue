<template>
  <div class="wrap-content">
    <nuxt />
  </div>
</template>

<style lang="scss">
.no-outline {
  outline: none;
}
.pointer {
  cursor: pointer;
}
p, h3, h4 {
  margin: 0;
  padding: 0;
}
.content-center {
  margin: 0 auto;
  text-align: center;
}
.flex {
  display: flex;
}
.logo {
  height: 100%;
  background-image: url('~assets/header/logo.svg');
}
.bg-standart-options {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.wrap-content {
  min-width: 320px;
}
</style>
