const db = require('../mysql_models')

const toSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

class Comments {
  constructor (comment) {
    this.comment = comment
  }

  convert (comment) {
    const newObject = {}

    for (const camel in comment) {
      newObject[toSnakeCase(camel)] = comment[camel]
    }

    return newObject
  }

  async add () {
    await db.setData('comments', this.convert(this.comment))
  }

  async update (id) {
    await db.updateData('comments', this.convert(this.comment), id)
  }

  async getByUidArticle (id) {
    const result = await db.getQuerySafe('comments', 'id_article', id, 'equality')
    return result
  }

  toJSON () {
    return {
      ...this.comment
    }
  }

  async getByIdUser (id) {
    const result = await db.getQuerySafe('comments', 'id_user', id, 'equality')
    return result
  }

  async delete (id) {
    await db.getQuerySafe('comments', 'id', id, 'deleteProd')
  }
}

module.exports = Comments
