const Comments = require('../models/Comments')
const Article = require('../models/Articles')

const controller = {}

controller.add = async (req, res) => {
  const com = new Comments(req.body)
  const isLogin = req.body.isLogin

  if (isLogin) {
    delete req.body.isLogin
    await com.add()
  }

  return res.json({
    status: isLogin ? 'OK' : 'ERROR',
    data: com.toJSON()
  })
}

controller.getByUidArticle = async (req, res) => {
  const com = new Comments()
  const art = new Article()
  const resDb = await art.getByUid(req.params.uid)

  return res.json({
    status: 'OK',
    data: await com.getByUidArticle(resDb.id)
  })
}

controller.updateRate = async (req, res) => {
  const isLogin = req.body.isLogin

  if (!isLogin) {
    return res.sendStatus(401)
  }

  const com = new Comments({
    rate: Number(req.body.rateId)
  })

  await com.update(req.body.idComment)

  return res.json({
    status: 'OK'
  })
}

controller.delete = async (req, res) => {
  const com = new Comments()
  await com.delete(req.body.idComment)

  return res.json({
    status: 'OK'
  })
}

controller.testUser = async (req, res, next) => {
  const com = new Comments()
  const user = await com.getByIdUser(req.user.id)
  if ((user[0] && user[0].id_user === req.user.id) || req.user.roleId === 1) {
    return next()
  }
  return res.sendStatus(403)
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
