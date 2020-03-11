const jwt = require('express-jwt')
const config = require('../conf')

const auth = {
  required: jwt({
    secret: config.jwt.secret
  }),
  optional: jwt({
    secret: config.jwt.secret,
    credentialsRequired: false
  })
}

module.exports = auth
