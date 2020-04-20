const uuidv4 = require('uuid/v4')
const db = require('../mysql_models')

class Articles {
  constructor (article) {
    this.article = article
  }
  async save () {
    if (this.article.uid) {
      const resDB = await this.getByUid(this.article.uid)
      await db.updateData('articles', this.article, resDB.id)
    } else {
      this.article.uid = uuidv4()
      await db.setData('articles', this.article)
    }
  }

  async getAll (start, limit, query) {
    const S = parseInt(start, 10)
    const L = parseInt(limit, 10)
    const where = query && query.visible && query.visible === 'only' ? ' WHERE visible="1"' : ''
    const resDB = await db.getQuery(`SELECT * FROM articles${where} order by id desc limit ${!isNaN(S) ? S : 0}, ${!isNaN(L) ? L : 10};`)
    return resDB
  }

  async getByUid (uid) {
    const resDB = await db.getQuerySafe('articles', 'uid', uid, 'likeAllFields')
    return resDB[0]
  }

  async totalRows () {
    const total = await db.getQuery('SELECT COUNT(1) FROM articles')
    return total
  }

  async updateCountsComments (uid, low = false) {
    const resDB = await this.getByUid(uid)
    await db.updateData('articles', { count_comments: low ? Number(resDB.count_comments) - 1 : Number(resDB.count_comments) + 1 }, resDB.id)
  }

  async updateView (id) {
    id = parseInt(id, 10)
    if (!isNaN(id)) {
      const view = await db.getQuery(`SELECT id, view FROM articles WHERE id=${id}`)
      await db.updateData('articles', { view: Number(view[0].view) + 1 }, id)
    }
  }

  async delete (id) {
    await db.getQuerySafe('articles', 'id', id, 'deleteProd')
  }

  toJSON () {
    return {
      uid: this.article.uid
    }
  }
}

module.exports = Articles
