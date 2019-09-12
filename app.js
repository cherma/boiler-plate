const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const winston = require('./utils/winston');
const preLoginRoutes = require('./routes/pre-login-route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: winston.stream }));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'fully healthy!',
  });
});

app.use('/', preLoginRoutes);


module.exports = app;
