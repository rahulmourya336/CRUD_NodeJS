/* eslint-disable no-trailing-spaces,indent */
const mongoose = require('mongoose');
// Connection URL  
const db = 'mongodb://localhost:27017/employeeDetails';
// Use connect method to connect to the Server  
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
});

const Schema = mongoose.Schema;
const user = new Schema({
    email: String,
    mobile: Number,
    name: String,
    password: String,
    status: Boolean

});

const users = mongoose.model('users', user);

module.exports = users;
