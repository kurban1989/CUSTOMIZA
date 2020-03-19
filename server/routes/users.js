const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const auth = require('../auth')
const userController = require('../controllers/userController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/get', auth.required, auth.admin, userController('getUsers'))
router.get('/get/:id', auth.required, auth.admin, userController('getUser'))
router.post('/save', auth.required, auth.admin, userController('saveUser'))
router.delete('/delete', auth.required, auth.admin, userController('deleteUser'))

router.get('/statuses/get', auth.required, auth.admin, userController('getUserStatuses'))
router.get('/roles/get', auth.required, auth.admin, userController('getUserRoles'))

module.exports = router
