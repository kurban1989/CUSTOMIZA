const fs = require('fs')
const path = require('path')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const yandex = require('./yandex')
const auth = require('./routes/auth')
const users = require('./routes/users')
const articles = require('./routes/articles')
const comments = require('./routes/comments')
const cases = require('./routes/cases')

const contentTypes = {
  '.js': 'application/javascript; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
}

require('./conf/passport')

config.dev = process.env.NODE_ENV !== 'production'
let staticPath = 'static'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    staticPath = 'dist'
    await nuxt.ready()
  }

  // Запрос image/jpeg файлов
  app.get('/load/:nameJpg', (req, res) => {
    if (path.extname(req.url) === '.gif') {
      fs.readFile(path.basename(req.url), (_err, data) => {
        res.writeHead(200, { 'content-type': 'image/gif' })
        res.end(data)
      })
    } else {
      res.setHeader('Content-Type', 'image/jpeg')
      res.sendFile(path.resolve(`${staticPath}/load`) + '/' + req.params.nameJpg)
    }
  })

  // app.get('/_dist/:nameFile', (req, res) => {
  //   res.setHeader('Content-Type', contentTypes[path.extname(req.url)])
  //   res.sendFile(path.resolve('/home/customiza.ru/CUSTOMIZA/.nuxt/dist/client/') + req.params.nameFile)
  // })
  app.get('/_dist/:nameFile', (req, res) => {
    consola.info({
      message: `Server request work!`,
      badge: true
    })
    fs.readFile(path.basename(req.url), (_err, data) => {
      res.writeHead(200, { 'content-type': contentTypes[path.extname(req.url)] })
      res.end(data)
    })
  })

  app.use('/api/auth', auth)
  app.use('/api/users', users)
  app.use('/api/articles', articles)
  app.use('/api/cases', cases)
  app.use('/api/comments', comments)
  app.use('/fonts', express.static('/fonts'))
  app.use('/yandex', yandex)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
