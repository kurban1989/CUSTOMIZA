const Cases = require('../models/Cases')

const controller = {}

controller.add = async (req, res) => {
  const cas = new Cases(req.body)
  await cas.save()
  return res.json({
    status: 'OK',
    data: cas.toJSON()
  })
}

controller.getById = async (req, res) => {
  const cas = new Cases()

  return res.json({
    status: 'OK',
    data: await cas.getById(req.params.id)
  })
}

controller.all = async (req, res) => {
  const cas = new Cases()

  return res.json({
    status: 'OK',
    data: await cas.getAll()
  })
}

controller.onlyUser = async (req, res) => {
  const cas = new Cases()

  return res.json({
    status: 'OK',
    data: await cas.getForUsers(req.params.start, req.params.end)
  })
}

controller.remove = async (req, res) => {
  const cas = new Cases()

  return res.json({
    status: 'OK',
    data: await cas.delete(req.params.id)
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
