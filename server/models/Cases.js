const db = require('../mysql_models')
const Snake = require('../helpers/toSnakeCase')

class Cases {
  constructor (Case) {
    this.case = Case
    this.inserted = 0
  }

  convert (object) {
    const newObject = {}

    for (const camel in object) {
      newObject[Snake.toSnakeCase(camel)] = object[camel]
    }

    return newObject
  }

  async save () {
    if (this.case.id) {
      await db.updateData('cases', this.convert(this.case), this.case.id)
    } else {
      const result = await db.setData('cases', this.convert(this.case))
      this.inserted = result.insertId
    }
  }

  async getAll () {
    const cases = await db.getQuery('SELECT * FROM cases ORDER BY id DESC')
    return cases
  }

  async getForUsers (start, limit) {
    const S = parseInt(start, 10)
    const L = parseInt(limit, 10)
    const cases = await db.getQuery(`SELECT * FROM cases WHERE visible='1' ORDER BY id DESC LIMIT ${!isNaN(S) ? S : 0}, ${!isNaN(L) ? L : 10};`)
    return cases
  }

  async getById (id) {
    const resDB = await db.getQuerySafe('cases', 'id', id, 'likeAllFields')
    return resDB[0]
  }

  async delete (id) {
    await db.getQuerySafe('cases', 'id', id, 'deleteProd')
  }

  async updateView (id) {
    id = parseInt(id, 10)
    if (!isNaN(id)) {
      const view = await db.getQuery(`SELECT id, views FROM cases WHERE id=${id}`)
      await db.updateData('cases', { views: Number(view[0].views) + 1 }, id)
    }
  }

  toJSON () {
    return {
      id: this.case.id ? this.case.id : this.inserted,
      ...this.case
    }
  }
}

module.exports = Cases
