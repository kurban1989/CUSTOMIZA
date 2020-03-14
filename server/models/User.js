const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const db = require('../mysql_models')
const Users = require('../resources/Users')
const config = require('../conf')

// eslint-disable-next-line no-unused-expressions
'use strict'

class User {
  constructor (user) {
    for (const key in user) {
      this[key] = user[key]
    }
  }
  setPassword (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
  }
  validatePassword (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
    return this.hash === hash
  }
  generateJWT () {
    return jwt.sign({
      id: this.id,
      email: this.email
    }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  }
  toJSON () {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      roleId: this.roleId,
      roleName: this.roleName,
      statusId: this.statusId,
      statusName: this.statusName,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
  // eslint-disable-next-line require-await
  async save () {
    if (this.id) {
      await db.updateData('users', this, this.id)
    } else {
      await db.setData('users', this)
    }
    Object.assign(this, await User.getUser(this.id))
  }
  // eslint-disable-next-line require-await
  async delete () {
    await db.getQuerySafe('users', 'id', this.id, 'deleteProd')
  }
  // eslint-disable-next-line require-await
  static async getUser (id) {
    const resultDb = await Users.getUsers('id', id)
    return resultDb.length === 0 ? null : new User(resultDb[0])
  }
  // eslint-disable-next-line require-await
  static async getUserByEmail (login) {
    const resultDb = await Users.getUsers('email', login)
    return resultDb.length === 0 ? null : new User(resultDb[0])
  }
  // eslint-disable-next-line no-dupe-class-members
  static async getUsers () {
    const resultDb = await Users.getUsers()
    const users = []
    resultDb.map((user) => {
      users.push(new User(user))
    })
    return users
  }
}

module.exports = User
