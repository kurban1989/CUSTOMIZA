import Vue from 'vue'
import lang from 'element-ui/src/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

const ElementUI = require('element-ui')

// configure language
locale.use(lang)

// Init ElementUI components
Vue.use(ElementUI)
