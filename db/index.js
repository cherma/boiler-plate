const mongoose = require('mongoose');
const chalk = require('chalk');
const { db } = require('../config');
const logger = require('../utils/winston');

function connect() {
  mongoose.connect(db.connectionString, { auto_reconnect: true, useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
}

connect();

mongoose.connection.on('error', () => {
  logger.error('Could not connect to mongoose');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Lost mongo connection');
});

mongoose.connection.on('reconnected', () => {
  logger.warn('Reconnected mongo connection');
});

function quit() {
  mongoose.connection.close(() => {
    console.log(chalk.hex('#009688')('Closing DB connection'));
  });
}

module.exports = {
  mongoose,
  quit,
};
