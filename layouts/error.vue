<template>
  <div class="wrapp">
    <HeaderForPages :menu-list="list" />

    <section class="container pt-4 flex f-column justify-content-center">
      <h1>{{ error.message }}</h1>
      <p>{{ error.messageCustom }}</p>
      <img src="/img/error-img.jpg" alt="">
      <h3>Oops... the page you were looking for is no longer available</h3>
      <a href="/">Back on Customiza.ru</a>
    </section>
    <footer-site />
  </div>
</template>

<script>
import HeaderForPages from '~/components/header/HeaderForPages'
import mainMenu from '~/resourse/mainMenu.json'
import FooterSite from '~/components/FooterSite'

export default {
  name: 'Error',
  components: {
    FooterSite,
    HeaderForPages
  },
  props: {
    error: {
      type: Object,
      required: false,
      default: () => {
        return {
          message: 'Not found',
          messageCustom: ''
        }
      }
    }
  },
  data () {
    return {
      list: mainMenu
    }
  },
  beforeMount () {
    if (this.$router.history.current.fullPath === '/profile') {
      this.error.messageCustom = '-> Страница профиля находится в разработке <-'
    }
  }
}
</script>
<style lang="scss">
.wrapp {
  text-align: center;

  img {
    width: 602px;
    margin: 0 auto;
    @media (max-width: 700px) {
      width: 100%;
    }
  }

  h1 {
    margin-top: 40px;
    font-style: normal;
    font-weight: bold;
    font-size: 31px;
    line-height: 120%;
    text-align: center;
  }

  h3, p {
    margin-top: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #778089;
    text-align: center;
  }
}
</style>
