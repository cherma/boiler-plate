const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(helmet());
app.use(compression());


app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'fully healthy!',
  });
});

module.exports = app;
