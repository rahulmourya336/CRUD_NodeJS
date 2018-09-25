/* eslint-disable quote-props,comma-dangle,semi,quotes,linebreak-style,no-console,require-await */
const { MongoClient } = require('mongodb')
const chalk = require('chalk')

const DBUrl = 'mongodb://localhost:27017'
const DBName = 'testdb';

async function mongo() {
  let client;
  try {
    client = await MongoClient.connect(DBUrl)
    console.log(`${chalk.green(`Connected to DB $\{DBName}`)}`)
    const db = client.db(DBName)
  } catch (err) {
    console.log(chalk.red('Database Offline'))
    console.log(err.stack)
  }
}

module.exports = mongo;
