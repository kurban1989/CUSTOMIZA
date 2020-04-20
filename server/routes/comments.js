const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const articleController = require('../controllers/articleController')
const commentController = require('../controllers/commentController')
const auth = require('../auth')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/add', auth.optional, auth.isUser, articleController('updateComment'), commentController('add'))
router.post('/delete', auth.required, commentController('testUser'), articleController('updateComment'), commentController('delete'))
router.post('/update-rate', auth.optional, auth.isUser, commentController('updateRate'))
router.get('/get/:uid', commentController('getByUidArticle'))

module.exports = router
