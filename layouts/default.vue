<template>
  <div class="wrap-content">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  overflow-x: hidden;
}
.relative {
  position: relative;
}
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
