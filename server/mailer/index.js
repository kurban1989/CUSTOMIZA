const nodemailer = require('nodemailer')
const config = require('../conf')

const transporter = nodemailer.createTransport(config.nodemailer)

const mailer = (message) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      error ? reject(error) : resolve(info)
    })
  })
}
// verify connection configuration
const testMailer = () => {
  transporter.verify((error, success) => {
    if (error) {
      console.log(`Error verify \n ${error}`)
    } else {
      console.log('Server is ready to take our messages')
    }
  })
}
module.exports = { mailer, testMailer }
