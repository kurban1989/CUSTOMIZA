const User = require('../models/User')

const controller = {}

controller.getUserStatuses = async function (req, res) {
  const data = await User.getUserStatuses()
  return res.json({
    status: 'OK',
    data
  })
}

controller.getUserRoles = async function (req, res) {
  const data = await User.getUserRoles()
  return res.json({
    status: 'OK',
    data
  })
}

controller.getUser = async function (req, res) {
  const user = await User.getUser(req.params.id)
  return res.json({
    status: 'OK',
    data: user ? user.toJSON() : null
  })
}

controller.getUsers = async function (req, res) {
  const users = await User.getUsers()
  users.map(user => user.toJSON())
  return res.json({
    status: 'OK',
    data: users
  })
}

// eslint-disable-next-line require-await
controller.saveUser = async function (req, res) {
  const checkUser = !req.body.id ? await User.getUserByEmail(req.body.email) : false
  if (checkUser) {
    return res.json({
      status: 'ERROR',
      message: 'The entered e-mail is already registered'
    })
  }
  const user = new User(req.body)
  if (req.body.password && req.body.password.length >= 6) {
    user.setPassword(req.body.password)
  }
  await user.save()
  return res.json({
    status: 'OK',
    data: user.toJSON()
  })
}

// eslint-disable-next-line require-await
controller.deleteUser = async function (req, res) {
  const user = await User.getUser(req.body.id)
  if (!user) {
    return res.sendStatus(400)
  }
  await user.delete()
  return res.json({
    status: 'OK',
    data: user.toJSON()
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
