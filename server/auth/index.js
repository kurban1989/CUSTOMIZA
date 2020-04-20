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
  },
  employ: (req, res, next) => {
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      next()
    } else {
      return res.sendStatus(403)
    }
  },
  isUser: (req, res, next) => {
    if (!req.user || !req.user.roleId || req.user.roleId === 3) {
      req.query.visible = 'only'
    }

    if (req.user && req.user.roleId && (Number(req.user.roleId) > 0 && Number(req.user.roleId) < 4)) {
      req.body.isLogin = true
    }
    next()
  }
}

module.exports = auth
