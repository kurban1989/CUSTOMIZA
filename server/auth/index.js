const jwt = require('express-jwt')
const config = require('../conf')

const auth = {
  required: jwt({
    secret: config.jwt.secret
  }),
  optional: jwt({
    secret: config.jwt.secret,
    credentialsRequired: false
  }),
  admin: (req, res, next) => {
    if (req.user.roleId !== 1) {
      return res.sendStatus(403)
    }
    next()
  }
}

module.exports = auth
