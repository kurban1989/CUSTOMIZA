const https = require('https')
const fs = require('fs')
const FormData = require('form-data')
const uuidv4 = require('uuid/v4')
const db = require('../mysql_models')

exports.setTask = async function (dataObject, config) {
  dataObject.file_name = dataObject.file ? dataObject.file : null
  delete dataObject.errors
  delete dataObject.file
  dataObject.isCheckedPersonalData = Number(dataObject.isCheckedPersonalData)

  const resultDb = await db.setData('consultation_sheet', dataObject)

  const postData = JSON.stringify({
    'summary': `Заявка на консультацию от: ${dataObject.name}`,
    'queue': {
      'id': '1'
    },
    'description': `${dataObject.question} 
                                                            
                                                 
| Данные клиента:                               
                                                         
| Телефон: ${dataObject.phone}; Email: ${dataObject.email} 

| ID заявки для клиента: ${String(resultDb.insertId)}`,
    'type': {
      'key': 'task'
    },
    'priority': {
      'key': 'normal'
    },
    'followers': [25812304],
    'unique': `${uuidv4()}|#|${dataObject.insertId}`
  })

  const options = {
    hostname: 'api.tracker.yandex.net',
    port: 443,
    path: '/v2/issues/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': `OAuth ${config.token}`,
      'X-Org-Id': config.ID
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        d = Object.assign({}, JSON.parse(d), { idInserted: resultDb.insertId, fileName: dataObject.file_name })
        return resolve(d)
      })
    })
    req.on('error', (error) => {
      return reject(error)
    })
    req.write(postData)
    req.end()
  })
}

exports.setFileInTask = async function (nameFile, pathToFile, idOurDb, idYandex, config) {
  const form = new FormData()
  form.append('file', fs.createReadStream(`${pathToFile}/${nameFile}`))

  await db.updateData('consultation_sheet', { file_name: nameFile }, idOurDb)

  // const buffer = Buffer.from(fs.readFileSync(path.resolve(`${__dirname}/file.txt`)))
  // const blob = Uint8Array.from(buffer).buffer

  const options = {
    hostname: 'api.tracker.yandex.net',
    port: 443,
    path: `/v2/issues/${idYandex}/attachments/?filename=${nameFile}`,
    method: 'POST',
    headers: Object.assign({}, form.getHeaders(), {
      'Authorization': `OAuth ${config.token}`,
      'X-Org-Id': config.ID
    })
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options)

    form.pipe(req)

    req.on('response', (res) => {
      res.on('data', (d) => {
        return resolve(d)
      })
    })

    req.on('error', (error) => {
      return reject(error)
    })
  })
}
