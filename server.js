const http = require('http');
const chalk = require('chalk');
const mongoose = require('./db/mongoose');
const { PORT, HOST } = require('./env');
const app = require('./app');

const server = http.Server(app);
console.log(chalk.hex('#009688')(`Server Started in port ${PORT}`));

server.listen(Number(PORT), HOST, () => {
});

function shutdown() {
  console.log(chalk.hex('#f00')('Warn:*******shutting down server*********'));
  mongoose.connection.close(() => {
    console.log(chalk.hex('#f00')('Forcing Mongo to close'));
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
