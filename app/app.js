const config = require('../config');
global.Configurations = config();
const path = require('path');
const glob = require('glob');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(logger('combined'));
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

module.exports = app;
