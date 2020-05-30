// eslint-disable-next-line no-unused-vars
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const letter = require('../helpers/templateMailRent')
const letter2 = require('../helpers/answerRent')
const { mailer } = require('../mailer')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/', async (req, res) => {
  if (req.body.errors) {
    res.status(400).send('Bad request')
    return false
  }

  const messageToCustomer = letter.getLetter(req.body)
  const messageToOwner = letter2.getLetter(req.body)

  // await testMailer()
  // Отправка писем
  try {
    await mailer(messageToCustomer)
    await mailer(messageToOwner)
    res.status(200).json({ status: 'OK', result: 'Request rent success' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    res.status(500).json({ status: 'Err', result: 'Server Error' })
  }
})

module.exports = router
