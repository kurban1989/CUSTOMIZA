const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const auth = require('../auth')
const recaptcha = require('../recaptcha')
const authController = require('../controllers/authController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/signup', recaptcha, authController('signup'))
router.post('/login', auth.optional, authController('login'))
router.post('/logout', auth.required, authController('logout'))
router.get('/user', auth.required, authController('user'))

module.exports = router
