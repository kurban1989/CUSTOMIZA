const passport = require('passport')
const User = require('../models/User')
const { mailer } = require('../mailer')
const letterForgot = require('../helpers/forgotMail')
const letterConfirm = require('../helpers/confirmMail')

const controller = {}

controller.checkConfirmToken = async (req, res) => {
  const user = await User.getUserByConfirmEmailToken(req.body.token)
  return res.json({
    status: user ? 'OK' : 'ERROR'
  })
}

controller.confirmEmail = async (req, res) => {
  const user = await User.getUserByConfirmEmailToken(req.body.token)
  if (!user) {
    return res.sendStatus(404)
  }
  await user.confirmEmail()
  return res.json({
    status: 'OK',
    user: user.toJSON()
  })
}

controller.confirm = async (req, res) => {
  const user = await User.getUserByEmail(req.body.email)
  if (!user) {
    return res.json({
      status: 'ERROR',
      message: 'The entered e-mail is not registered'
    })
  }
  const token = await user.generateConfirmEmailJWT()
  const message = letterConfirm.getLetter({ email: user.email, token })
  await mailer(message)
  return res.json({
    status: 'OK'
  })
}

controller.resetPassword = async (req, res) => {
  const user = await User.getUserByResetPasswordToken(req.body.token)
  if (!user || !user.checkResetPasswordExpires()) {
    return res.json({
      status: 'ERROR',
      message: 'Password reset link expired'
    })
  }
  if (!req.body.user.password || req.body.user.password.length < 6) {
    return res.sendStatus(400)
  }
  user.setPassword(req.body.user.password)
  await user.save()
  return res.json({
    status: 'OK',
    user: user.toJSON()
  })
}

controller.checkResetToken = async (req, res) => {
  const user = await User.getUserByResetPasswordToken(req.body.token)
  if (!user || !user.checkResetPasswordExpires()) {
    return res.json({
      status: 'ERROR',
      message: 'Password reset link expired'
    })
  }
  return res.json({
    status: 'OK'
  })
}

controller.forgot = async (req, res) => {
  const user = await User.getUserByEmail(req.body.email)
  if (!user) {
    return res.json({
      status: 'ERROR',
      message: 'The entered e-mail is not registered'
    })
  }
  const token = await user.generateForgotPasswordJWT()
  const message = letterForgot.getLetter({ email: user.email, token })
  await mailer(message)
  return res.json({
    status: 'OK'
  })
}

controller.signup = async (req, res) => {
  const checkUser = await User.getUserByEmail(req.body.user.email)
  if (checkUser) {
    return res.json({
      status: 'ERROR',
      message: 'The entered e-mail is already registered'
    })
  }
  const user = new User(req.body.user)
  user.setPassword(req.body.user.password)
  await user.save()
  return res.json({
    status: 'OK'
  })
}

controller.login = (req, res, next) => {
  const user = req.body
  if (!user.email) {
    return res.status(422).json({
      errors: {
        login: 'is required'
      }
    })
  }
  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { return next(err) }
    if (user) {
      if (user.statusId === 3) {
        return res.status(403).json({
          status: 'ERROR',
          message: 'E-mail not verified'
        })
      }
      user.token = user.generateJWT()
      return res.status(200).json({ token: user.token })
    }
    return res.status(400).json(info)
  })(req, res, next)
}

controller.logout = (req, res) => {
  req.logOut()
  return res.json({
    status: 'OK'
  })
}

controller.user = async (req, res) => {
  const user = await User.getUser(req.user.id)
  if (!user) {
    return res.sendStatus(401)
  }
  return res.json({
    status: 'OK',
    user: user.toJSON()
  })
}

module.exports = (method) => {
  return async (request, response, next) => {
    try {
      await controller[method](request, response, next)
    } catch (error) {
      next(error)
    }
  }
}
