const passport = require('passport')
const User = require('../models/User')

const controller = {}

// eslint-disable-next-line require-await
controller.registration = async function (req, res) {
  const u = {
    id: 2,
    email: 'test@test.ru',
    firstName: 'Тест',
    lastName: 'Тестов',
    phone: '9999999999',
    password: 'password'
  }
  const user = new User(u)
  user.setPassword(u.password)
  await user.save()
  console.log(user)
  return res.json(user)
}

controller.login = function (req, res, next) {
  const user = req.body
  if (!user.login) {
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
      user.token = user.generateJWT()
      return res.json({ token: user.token })
    }
    return res.status(400).json(info)
  })(req, res, next)
}

// eslint-disable-next-line require-await
controller.logout = async function (req, res) {
  return res.json({
    status: 'OK'
  })
}

// eslint-disable-next-line require-await
controller.user = async function (req, res) {
  const user = await User.getUser(req.user.id)
  if (!user) {
    return res.sendStatus(401)
  }
  return res.json({
    status: 'OK',
    user: user.toJSON()
  })
}

module.exports = function (method) {
  return async function (request, response, next) {
    try {
      await controller[method](request, response, next)
    } catch (error) {
      next(error)
    }
  }
}
