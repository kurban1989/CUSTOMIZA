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
    this.resetPasswordToken = ''
    this.resetPasswordExpires = ''
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
      roleId: this.roleId,
      email: this.email
    }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  }
  generateForgotPasswordJWT () {
    const token = crypto.pbkdf2Sync(this.email, this.salt, 10000, 64, 'sha512').toString('hex')
    this.resetPasswordToken = token
    this.resetPasswordExpires = Date.now() + 3600000
    this.save()
    return token
  }
  checkResetPasswordExpires () {
    return this.resetPasswordExpires > Date.now()
  }
  generateConfirmEmailJWT () {
    const token = crypto.pbkdf2Sync(this.email, this.salt, 10000, 64, 'sha512').toString('hex')
    this.confirmEmailToken = token
    this.save()
    return token
  }
  confirmEmail () {
    this.confirmEmailToken = ''
    this.statusId = 1
    return this.save()
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
    const user = Object.assign({}, this)
    delete user.created_at
    delete user.updated_at
    if (user.id) {
      await db.updateData('users', user, user.id)
    } else {
      await db.setData('users', user)
    }
    Object.assign(this, await User.getUserByEmail(user.email))
  }
  // eslint-disable-next-line require-await
  async delete () {
    await db.getQuerySafe('users', 'id', this.id, 'deleteProd')
  }
  // eslint-disable-next-line require-await
  static async getUser (id) {
    if (!id) {
      return null
    }
    const resultDb = await Users.getUsers('id', id)
    return resultDb.length === 0 ? null : new User(resultDb[0])
  }
  // eslint-disable-next-line require-await
  static async getUserByEmail (login) {
    if (!login) {
      return null
    }
    const resultDb = await Users.getUsers('email', login)
    return resultDb.length === 0 ? null : new User(resultDb[0])
  }
  // eslint-disable-next-line require-await
  static async getUserByResetPasswordToken (token) {
    if (!token) {
      return null
    }
    const resultDb = await Users.getUsers('resetPasswordToken', token)
    return resultDb.length === 0 ? null : new User(resultDb[0])
  }
  // eslint-disable-next-line require-await
  static async getUserByConfirmEmailToken (token) {
    if (!token) {
      return null
    }
    const resultDb = await Users.getUsers('confirmEmailToken', token)
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
  // eslint-disable-next-line no-dupe-class-members
  static async getUserStatuses () {
    const resultDb = await Users.getStatuses()
    return resultDb
  }
  // eslint-disable-next-line no-dupe-class-members
  static async getUserRoles () {
    const resultDb = await Users.getRoles()
    return resultDb
  }
}

module.exports = User
