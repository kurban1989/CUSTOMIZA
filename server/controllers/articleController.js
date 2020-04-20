const Article = require('../models/Articles')

const controller = {}

controller.saveArt = async (req, res) => {
  const art = new Article(req.body)
  await art.save()
  return res.json({
    status: 'OK',
    data: art.toJSON()
  })
}

controller.getByUid = async (req, res) => {
  const art = new Article()

  return res.json({
    status: 'OK',
    data: await art.getByUid(req.params.uid)
  })
}

controller.getAll = async (req, res) => {
  const art = new Article()

  return res.json({
    status: 'OK',
    data: await art.getAll(req.params.start, req.params.limit, req.query),
    total: await art.totalRows()
  })
}

controller.updateView = async (req, res) => {
  const art = new Article()

  await art.updateView(req.body.id)

  return res.json({
    status: 'OK',
    data: 'updated'
  })
}

controller.updateComment = async (req, res, next) => {
  const isLogin = req.body.isLogin
  if (!isLogin) {
    return res.sendStatus(401)
  }

  const art = new Article()
  // Здесь req.body.low должно быть тру, если коммент на удаление назначен
  await art.updateCountsComments(req.body.uid, req.body.low)

  next()
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
