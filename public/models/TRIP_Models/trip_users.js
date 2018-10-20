/* eslint-disable no-trailing-spaces,indent */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String, unique: true },
    contact: Number,
    name: String,
    password: String,
    status: { type: Boolean, default: false },
});

const Users = mongoose.model('trip_user', user);

module.exports = Users;
