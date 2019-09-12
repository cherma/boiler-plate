const http = require('http');
const chalk = require('chalk');
const db = require('./db');
const { PORT } = require('./env');
const app = require('./app');

const server = http.Server(app);

server.listen(Number(PORT), () => {
  console.log(chalk.hex('#009688')(`Server Started in port ${PORT}`));
});

function shutdown() {
  console.log(chalk.hex('#f00')('Warn:*******shutting down server*********'));
  db.quit();
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
