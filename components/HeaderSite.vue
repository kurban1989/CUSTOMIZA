<template>
  <header class="header">
    <navbar />
    <div class="container">
      <h1 class="h1 row">
        {{ $t('mainH1') }}
      </h1>
    </div>
    <footer-head />
  </header>
</template>

<script>
import Navbar from '~/components/header/Navbar'
import FooterHead from '~/components/header/FooterHead'
export default {
  components: {
    Navbar,
    FooterHead
  }
}
</script>

<style lang="scss" scoped>
.h1 {
  color: #fff;
  font-size: 54px;
  font-weight: 500;
  text-align: left;
}
.header {
  width: 100vw;
  height: 1270px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  margin-bottom: 80px;
  background-image: url('~assets/header/bg-header-mini.png');
}

@media (min-width: 750px) {
  .header {
    background-image: url('~assets/header/bg-header.png');
  }
}
@media (max-width: 1292px) {
  .header {
    background-size: cover;
  }
}
@media (max-width: 991px) {
  .h1 {
    font-size: 34px;
    line-height: 44px;
  }
  .header {
    margin-bottom: 0;
    height: 1200px;
  }
}
@media (max-width: 768px) {
  .h1 {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
  }
  .header {
    background-position: top left;
    height: fit-content;
    background-size: 125%;
    padding: 0 16px;
    margin-bottom: 28px;
  }
}
</style>
