// const db = require('../mysql_models')
const jwt = require('jsonwebtoken')
const config = require('../conf')

// eslint-disable-next-line no-unused-expressions
'use strict'

class User {
  constructor (user) {
    for (const key in user) {
      this[key] = user[key]
    }
  }
  validatePassword (password) {
    return this.password.trim() === password.trim()
  }
  generateJWT () {
    return jwt.sign({
      login: this.login,
      password: this.password
    }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  }
  toAuthJSON () {
    return {
      login: this.login,
      password: this.password,
      role_id: this.role_id
    }
  }
  // eslint-disable-next-line require-await
  static async getUserByLogin (login) {
    const user = {
      login: 'test',
      password: 'password',
      role_id: 2
    }
    return new User(user)
  }
}

module.exports = User
