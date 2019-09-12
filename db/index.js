const mongoose = require('mongoose');
const { db } = require('../config');
const logger = require('../utils/winston');
const chalk = require('chalk');

function connect() {
  mongoose.connect(db.connectionString, { auto_reconnect: true, useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
}

connect();

mongoose.connection.on('error', function(){
 logger.error('Could not connect to mongoose');
});

mongoose.connection.on('disconnected', function(){
  logger.warn('Lost mongo connection');
});

mongoose.connection.on('reconnected', function(){
  logger.warn('Reconnected mongo connection');
});

function quit(){
  mongoose.connection.close(function(){
    console.log(chalk.hex('#009688')(`Closing DB connection`));
  })
}

module.exports = {
  mongoose,
  quit
};
