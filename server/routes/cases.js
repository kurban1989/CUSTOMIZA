const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const caseController = require('../controllers/caseController')
const auth = require('../auth')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/add', auth.required, auth.employ, caseController('add'))
router.post('/get/:start/:end', auth.optional, caseController('onlyUser'))
router.post('/get-all', auth.required, auth.employ, caseController('all'))
router.get('/delete/:id', auth.required, auth.admin, caseController('remove'))
router.get('/get/:id', auth.required, auth.employ, caseController('getById'))
router.get('/get-case/:id', auth.optional, auth.isUser, caseController('getById'))
router.post('/update-views', caseController('updateView'))

module.exports = router
