const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// eslint-disable-next-line require-await
router.post('/login', async (req, res) => {
  console.log(req.body)
  return res.status(200).json({ token: 'tokeeeen' })
})
// eslint-disable-next-line require-await
router.post('/logout', async (req, res) => {
  console.log('logout', req.body)
  return res.status(200).json({})
})
// eslint-disable-next-line require-await
router.get('/user', async (req, res) => {
  console.log('user', req.headers)
  return res.status(200).json({})
})

module.exports = router
