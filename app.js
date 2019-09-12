const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const winston = require('./utils/winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: winston.stream }));


app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'fully healthy!',
  });
});

module.exports = app;
