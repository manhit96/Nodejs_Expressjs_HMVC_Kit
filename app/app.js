const config = require('../config');
global.Configurations = config();
const path = require('path');
const glob = require('glob');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('combined'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.static(path.resolve('public')));

// import modules
debug('Import module:');
const modules = glob.sync(__dirname + '/modules/*');
for (const module of modules) {
  const {name, routes} = require(module);
  debug('->', name);
  app.use(routes);
}

// not found page/url
app.use((req, res) => {
  res.sendStatus(404);
})

module.exports = app;
