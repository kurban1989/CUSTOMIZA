const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.getUserByEmail(email).then((user) => {
    if (!user || user.statusId === 2 || !user.validatePassword(password)) {
      return done(null, false, { errors: { 'login or password': 'is invalid' } })
    }
    return done(null, user)
  }).catch(done)
}))

module.exports = passport
