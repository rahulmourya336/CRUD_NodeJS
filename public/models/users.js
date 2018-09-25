/* eslint-disable sort-keys,comma-dangle,semi */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: String

})

module.exports = mongoose.model('user', userSchema)
