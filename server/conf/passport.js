const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, (login, password, done) => {
  User.getUserByEmail(login).then((user) => {
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { errors: { 'login or password': 'is invalid' } })
    }
    return done(null, user)
  }).catch(done)
}))

module.exports = passport
