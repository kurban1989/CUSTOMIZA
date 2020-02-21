<template>
  <div class="wrap-content">
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '~/assets/fonts_mixins/font-source-declaration';
@mixin font-face(
  $font-family,
  $file-path,
  $weight: normal,
  $style: normal,
  $asset-pipeline: $asset-pipeline,
  // $file-formats: eot woff2 woff ttf svg) {
  $file-formats: eot woff ttf svg) {

  $font-url-prefix: font-url-prefixer($asset-pipeline);

  @font-face {
    font-family: $font-family;
    font-style: $style;
    font-weight: $weight;

    src: font-source-declaration(
      $font-family,
      $file-path,
      $asset-pipeline,
      $file-formats,
      $font-url-prefix
    );

    font-display: fallback; /* Задаем поведение браузера на время загрузки */
  }
}

$path-base:   '/';
$path-fonts:  '#{$path-base}fonts';
$font-Roboto: 'Roboto', sans-serif;
$font-base:   $font-Roboto;
 /* Fonts
   ========================================================================== */
@include font-face('Roboto', '#{$path-fonts}/Roboto/Robotothinitalic', 300, italic, $file-formats: woff woff2);
@include font-face('Roboto', '#{$path-fonts}/Roboto/Roboto', 400, normal, $file-formats: woff woff2);
@include font-face('Roboto', '#{$path-fonts}/Roboto/Robotobold', 700, normal, $file-formats: woff woff2);
@include font-face('Roboto', '#{$path-fonts}/Roboto/Robotolight', 200, normal, $file-formats: woff woff2);
@include font-face('Roboto', '#{$path-fonts}/Roboto/Robotothin', 100, normal, $file-formats: woff woff2);

html {
  font-family: $font-base;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
body {
  font-family: $font-base !important;
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
