const mongoose = require('mongoose');
const { db } = require('../config');

function connect() {
  mongoose.connect(db.connectionString, { auto_reconnect: true, useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
}

connect();

module.exports = {
  mongoose,
};
