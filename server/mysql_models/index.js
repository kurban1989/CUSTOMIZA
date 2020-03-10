/* eslint-disable no-useless-escape */
/* eslint-disable new-cap */
/* eslint-disable no-new-require */
// const config = require('../conf')
const mysql = new require('mysql')
// TO DO only for develop computer
const client = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'customiza'
})
// const client = mysql.createPool(config.mysql)

function setCHARACTER () {
  client.getConnection(async (_err, connector) => {
    try {
      await connector.query('SET NAMES utf8')
      await connector.query("SET CHARACTER SET 'utf8'")
      await connector.query("SET SESSION collation_connection = 'utf8_general_ci'")
      connector.release()
    } catch (err) {
      throw new Error(err)
    }
  })
}

// setCHARACTER() // Первый запрос на изменение кодировки

// Функция для любого запроса к БД
exports.getQuery = (sql, callback) => {
  setCHARACTER()
  // Промис запроса
  return new Promise((resolve, reject) => {
    client.getConnection((_err, connector) => {
      connector.query(sql, (error, result) => {
        connector.release()

        if (error) {
          return reject(new Error(error))
        }

        if (typeof callback === 'function') {
          const resFunc = callback()
          return resolve(result, resFunc)
        } else {
          return resolve(result)
        }
      })
    })
  })
}

// Функция для любого СОДЕРЖАЩИЙ ЗАПРОС ПО ОДНОМУ ПОЛЮ запроса к БД, которые идут от юзера безопасные соединения
exports.getQuerySafe = (table, field, query, pattern = 'like', callback) => {
  setCHARACTER()

  let sql = 'SELECT id, ?? FROM ?? WHERE ?? like ?'
  let inserts = [field, table, field, '%' + query + '%']

  if (pattern === 'equality') {
    sql = 'SELECT * FROM ?? WHERE ?? = ?'
    inserts = [table, field, query]
  } else if (pattern === 'likeAllFields') {
    sql = 'SELECT * FROM ?? WHERE ?? like ?'
    inserts = [table, field, '%' + query + '%']
  } else if (pattern === 'deleteProd') {
    sql = 'DELETE FROM ?? WHERE ?? = ?'
    inserts = [table, field, query]
  }
  // Промис запроса
  return new Promise((resolve, reject) => {
    client.getConnection((_err, connector) => {
      sql = connector.format(sql, inserts)

      connector.query(sql, (error, result) => {
        connector.release()

        if (error) {
          return reject(new Error(error))
        }
        if (typeof callback === 'function') {
          const resFunc = callback()
          return resolve(result, resFunc)
        } else {
          return resolve(result)
        }
      })
    })
  })
}
// Функция для любого многополевого запроса к БД, которые идут от юзера безопасные соединения
exports.getQueryManySafe = (table, obj, callback) => {
  setCHARACTER()

  return new Promise((resolve, reject) => {
    const fields = Object.keys(obj)
    let dataWrite = ''
    let sql = ''
    let like = ''

    /* Если мы хотим чтобы последнее условие было как 'like %search%', то первый аргумент должен быть обязательно массивом */
    /* Где второй элемент должен быть парметром для этого LIKE */
    if (Array.isArray(table)) {
      like = table[1]
      table = table[0]
    }

    clearBad(obj).then((ObjProm) => {
      let i = 0
      for (const prop in ObjProm) {
        if ({}.hasOwnProperty.call(ObjProm, prop)) {
          // если пусто то не продолжаем дальше итерацию
          if (ObjProm[prop] === undefined || ObjProm[prop] === 'NULL') {
            i++
          } else {
            if (like === 'latestLike' && i === fields.length - 1) {
              dataWrite += '`' + fields[i] + '` like "%' + obj[prop] + '%"'
            } else {
              dataWrite += '`' + fields[i] + '` = "' + obj[prop]
              dataWrite += '" AND '
            }
            i++
          }
        }
      }
    })
      .then(() => {
        dataWrite = dataWrite.replace(/(\')/gm, '')
        dataWrite = dataWrite.replace(/\"on\"/gm, '1')

        if (like !== 'latestLike') {
        /* Обрезка хвостика ('" AND ') */
          dataWrite = dataWrite.substring(0, dataWrite.length - 5)
        }
      })
      .then(() => {
        sql = 'SELECT * FROM ' + table + ' WHERE ' + dataWrite

        client.getConnection((_err, connector) => {
        // запрос
          connector.query(sql, (error, result) => {
            if (error) {
              connector.release() // Закрываем соединение
              return reject(new Error(error))
            }

            connector.release() // Закрываем соединение

            if (typeof callback === 'function') {
              callback()
              return resolve(result)
            } else {
              return resolve(result)
            }
          })
        })
      })
  })
}
/* Функция для обновления записи данных в БД */
exports.updateData = (table, obj, id, callback) => {
  setCHARACTER()

  return new Promise((resolve, reject) => {
    const fields = Object.keys(obj)
    let dataWrite = ''
    let sql = ''

    clearBad(obj).then((ObjProm) => {
      let i = 0
      for (const prop in ObjProm) {
        if ({}.hasOwnProperty.call(ObjProm, prop)) {
          dataWrite += '`' + fields[i] + '` = "' + obj[prop]
          dataWrite += '", '
          i++
        }
      }
    })
      .then(() => {
        dataWrite = dataWrite.replace(/(\')/gm, '')
        dataWrite = dataWrite.replace(/\"on\"/gm, '1')
        dataWrite = clearDigitsFields(dataWrite)
      })
      .then(() => {
        sql = 'UPDATE `' + table + '` SET ' + dataWrite + ', date = NOW() WHERE id=' + parseInt(id, 10) + ';'
        sql = sql.replace(/(\"NULL\")/, 'NULL') // Если мы специально хотим записать NULL в ячейку.

        client.getConnection((_err, connector) => {
        // запрос
          connector.query(sql, (error, result) => {
            if (error) {
              connector.release() // Закрываем соединение
              return reject(new Error(error))
            }

            connector.release() // Закрываем соединение

            if (typeof callback === 'function') {
              callback()
              return resolve(result)
            } else {
              return resolve(result)
            }
          })
        })
      })
  })
}

/* Функция для записи данных в БД */
exports.setData = (table, obj, callback) => {
  setCHARACTER()

  return new Promise((resolve, reject) => {
    const fields = Object.keys(obj)
    let dataWrite = ''
    let sql = ''

    clearBad(obj).then((ObjProm) => {
      for (const prop in ObjProm) {
        if ({}.hasOwnProperty.call(ObjProm, prop)) {
          dataWrite += '"' + obj[prop]
          dataWrite += '", '
        }
      }
    })
      .then(() => {
        dataWrite = dataWrite.replace(/(on)/gm, '1')
        dataWrite = dataWrite.replace(/(\')/gm, '')
        dataWrite = clearDigitsFields(dataWrite)
      })
      .then(() => {
        sql = 'INSERT INTO `' + table + '` (' + fields + ', date) VALUES (' + dataWrite + ', NOW());'

        client.getConnection((err, connector) => {
          if (err) {
            return reject(new Error(err))
          }
          // запрос
          connector.query(sql, (error, result) => {
            if (error) {
              connector.release() // Закрываем соединение
              return reject(new Error(error))
            }

            connector.release() // Закрываем соединение

            if (typeof callback === 'function') {
              callback()
              return resolve(result)
            } else {
              return resolve(result)
            }
          })
        })
      })
      .catch((err) => { throw new Error('Look it Error: ' + err) })
  })
}

async function clearBad (obj) {
  for (const prop in obj) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      obj[prop] = await client.escape(obj[prop])
    }
  }
  return obj
}
// Очистка от кавычек в цифровых полях
function clearDigitsFields (str) {
  if (str.search(/(\,\s{1})/) > -1) {
    str = str.split(', ')
  } else if (str.search(/(\.\s{1})/) > -1) {
    str = str.split('. ')
  } else {
    return new Error('Invalid string separator.')
  }

  str = str.filter((item) => {
    return item.search(/\"{1}\d+\"{1}/) > -1 ? toNumber(item) : item
  })

  return str.join(',')
}

function toNumber (val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
