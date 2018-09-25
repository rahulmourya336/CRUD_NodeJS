/* eslint-disable comma-dangle,indent */
const passport = require('passport')
const { Strategy } = require('passport-local')

module.exports = function localStrategy () {
  passport.use(new Strategy({
      _usernameField: 'username',
      _passwordField: 'password'
    }, (username, password, done) => {
      const user = {
        username, password
      }
      done(null, user)
    }
  ))
}