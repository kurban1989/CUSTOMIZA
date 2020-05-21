import Vue from 'vue'
import { htmlspecialchars } from '~/helpers'

Vue.filter('capitalize', (value) => {
  if (!value) { return '' }

  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
})
Vue.filter('htmldecode', (value) => {
  if (!value) { return '' }

  value = value.toString()
  return htmlspecialchars.decode(value)
})
