const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const articleController = require('../controllers/articleController')
const auth = require('../auth')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/get/:uid', articleController('getByUid'))
router.post('/save', auth.required, auth.employ, articleController('saveArt'))
router.post('/update-views', articleController('updateView'))
router.get('/get-all/:start/:limit', auth.optional, auth.isUser, articleController('getAll'))

module.exports = router
