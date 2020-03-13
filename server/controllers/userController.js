const User = require('../models/User')

const controller = {}

controller.getUser = async function (req, res) {
  const user = await User.getUser(req.params.id)
  return res.json({
    status: 'OK',
    user: user.toJSON()
  })
}

controller.getUsers = async function (req, res) {
  const users = await User.getUsers()
  users.map(user => user.toJSON())
  return res.json({
    status: 'OK',
    users
  })
}

// eslint-disable-next-line require-await
controller.saveUser = async function (req, res) {
  console.log(req.body)
  const user = new User(req.body)
  if (req.body.password) {
    user.setPassword(req.body.password)
  }
  await user.save()
  console.log(user)
  return res.json({
    status: 'OK',
    user
  })
}

// eslint-disable-next-line require-await
controller.deleteUser = async function (req, res) {
  console.log(req.body)
  const user = await User.getUser(req.params.id)
  if (!user) {
    return res.sendStatus(400)
  }
  await user.delete()
  console.log(user)
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
