/* eslint-disable no-console */
/* eslint-disable no-path-concat */
// eslint-disable-next-line no-unused-vars
const path = require('path')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const config = require('../conf')
const { mailer } = require('../mailer')
const upload = require('../photogallery/UploadMiddleware')
const Resize = require('../photogallery/Resize')
const httpRequest = require('../helpers/httpRequest')
const letter = require('../helpers/templateMail')
const db = require('../mysql_models')
const filesImg = []
const imagePath = path.resolve(__dirname + '/public')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/', (req, res) => {
  Object.keys(req.body).forEach((item) => {
    if (item === 'file' || item === 'errors') {
      return
    }

    if (req.body[item] === '' || !req.body[item]) {
      req.body.errors = true
    }
  })

  if (req.body.errors) {
    res.status(400).send('Bad request')
    return false
  }

  httpRequest.setTask(req.body, config).then((result) => {
    if (result.statusCode > 399) {
      res.status(500).json({ error: 'Fail request', errorMessages: result.errorMessages })
      console.error(result)
      return false
    }

    db.updateData('consultation_sheet', {
      token: result.id,
      key: result.key,
      version: ~~result.version
    }, result.idInserted).then(async (resultDB) => {
      // Шаблон письма
      const message = letter.getLetter(Object.assign({}, { id: result.idInserted, key: result.key }, req.body))

      // Если есть файл в массиве загруженных файлов, то передадим в трекер яндекса
      if (result.fileName && filesImg.includes(result.fileName)) {
        httpRequest.setFileInTask(result.fileName, imagePath, result.idInserted, result.id, config)
          .then(async (resultUploadFile) => {
            if (resultUploadFile.statusCode > 399) {
              res.status(500).json({ error: 'Fail request', errorMessages: resultUploadFile.errorMessages, typeError: 'Failed to upload file to tracker' })
              console.error(resultUploadFile)
              return false
            }

            // Отправка письма клиенту
            try {
              await mailer(message)
            } catch (err) {
              console.error(err)
            }

            res.status(200).json({ status: 'OK', result: 'Task successful with attachments file )' })
            return true
          }).catch((err) => {
            console.error(err)
            res.status(500).json({ error: 'Fail request', typeError: 'Failed to upload file to tracker / exeption control' })
            return false
          })
      } else {
        // Отправка письма клиенту
        try {
          await mailer(message)
        } catch (err) {
          console.error(err)
        }

        res.status(200).json({ status: 'OK', result: 'Task successful' })
        return true
      }
    })
  }).catch((err) => {
    console.error(err)
    res.status(500).json({ error: 'Fail request', err })
    return false
  })
})

router.post('/upload', upload.single('file'), async (req, res) => {
  const staticPath = process.env.NODE_ENV !== 'production' ? 'static' : 'dist'
  const imagePathResult = req.body.silent ? path.resolve(`${staticPath}/load`) : imagePath
  const fileUpload = new Resize(imagePathResult)

  if (!req.file) {
    res.status(401).json({ error: 'Please provide an image' })
  }

  const filename = await fileUpload.save(req.file.path || req.file.buffer)

  if (!req.body.silent) {
    filesImg.push(filename)
  }

  return res.status(200).json({ status: 200, file: filename, location: `/load/${filename}` })
})

module.exports = router
