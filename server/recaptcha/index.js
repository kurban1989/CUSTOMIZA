const axios = require('axios')
const config = require('../conf')

module.exports = async function (req, res, next) {
  const recaptcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secret}&response=${req.body.recaptchaToken}`)
  if (recaptcha.data.success) {
    next()
  } else {
    return res.sendStatus(403)
  }
}
