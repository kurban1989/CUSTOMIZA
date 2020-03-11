const passport = require('passport')

const controller = {}

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
      // user.save()
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
controller.getUser = async function (req, res) {
  console.log('user', req.user)
  const user = req.user
  user.name = 'Попов Андрей'
  return res.json({
    status: 'OK',
    user
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
