const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const auth = require('../auth')
const userController = require('../controllers/userController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/get', auth.required, userController('getUsers'))
router.get('/get/:id', auth.required, userController('getUser'))
router.post('/save', auth.required, userController('saveUser'))
router.delete('/delete', auth.required, userController('deleteUser'))

router.get('/statuses/get', auth.required, userController('getUserStatuses'))
router.get('/roles/get', auth.required, userController('getUserRoles'))

module.exports = router
