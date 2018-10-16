const chalk = require('chalk');
const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/trip_demo';
mongoose.connect(db, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(`DB Connection ${error}`);
  } else {
    console.info(chalk.bgGreen.bold('Connected to DB'));
  }
});
