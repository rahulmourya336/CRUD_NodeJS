/* eslint-disable no-trailing-spaces,indent */
const mongoose = require('mongoose');

const category = ['Food',
                'Travel',
                'Purchases',
                'Fuel',
                'MISC'];

const Schema = mongoose.Schema;
const expense = new Schema({
    expenseAmount: Number,
    expenseCategory: String,
    expenseDate: Date,
    expenseName: String,
    tripID: { type: Schema.Types.ObjectId, ref: 'trip' },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
});

const expenses = mongoose.model('expenses', expense);

module.exports = expenses;