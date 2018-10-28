/* eslint-disable no-trailing-spaces,indent */
const mongoose = require('mongoose');
const Users = require('./trip_users')

const Schema = mongoose.Schema;

const trip = new Schema({
    creatorID: { type: Schema.Types.ObjectId, ref: 'Users' },
    endDate: Date,
    name: String,
    startDate: Date,
    url: String,
    creation: { type: Date, default: new Date(), unique: true },
});

const trips = mongoose.model('trip_list', trip);

module.exports = trips;
