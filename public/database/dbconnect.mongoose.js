/* eslint-disable comma-dangle,no-console,semi */
const mongoose = require('mongoose');

const dbConfig = 'mongodb://localhost:27017'

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log(`Could not connect to the database. Exiting now...${err}`);
  throw new Error('Error while establishing connection to database')
})
