/* eslint-disable no-trailing-spaces,indent */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const traveller = new Schema({
    tripID: { type: Schema.Types.ObjectId, ref: 'trip' },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
});

const travellers = mongoose.model('travellers', traveller);

module.exports = travellers;
