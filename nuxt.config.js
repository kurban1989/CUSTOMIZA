
const i18n = require('./i18n')
module.exports = {
  // Only Production
  // server: {
  //   // nuxt.js server options ( can be overrided by environment variables )
  //   port: 3000,
  //   host: 'customiza.ru'
  // },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Бесплатные консультации по установке, настройке и использованию любых платформ и конфигураций 1C | CUSTOMIZA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5.0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    // middleware: ['i18n'],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      return { x: 0, y: 0 }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'green' },
  /*
  ** Global CSS
  */
  css: [
    // '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/swiper', mode: 'client' },
    { src: '~/plugins/yandexMaps', mode: 'client' },
    { src: '~/plugins/VScrollLock', mode: 'client' },
    { src: '~/plugins/lazy' },
    { src: '~/plugins/vuelidate', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'nuxt-i18n',
      i18n
    ],
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  // serverMiddleware: ['./server'],
  auth: {
    redirect: {
      login: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token' },
          user: { propertyName: 'user' }
        }
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // proxy: true
  },
  proxy: {
    // '/api': 'http://localhost:3000'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
/*
customiza.ru
Callback URL: https://oauth.yandex.ru/verification_code
*/
