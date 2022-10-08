const debug = require("debug")("app:");
const path = require("path");
const glob = require("glob");

const { DATABASE } = require("../config")();
const dataSource = require("./shared/data-source");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// load app modules
const modules = [];
glob.sync(__dirname + "/modules/*").forEach((file) => {
  const module = require(file);
  modules.push(module);
});
// sort app modules by load priority
modules.sort((a, b) => (a.priority > b.priority ? 1 : -1));

// register app modules
const registerModules = () => {
  for (const module of modules) {
    module.register(app);
  }
};

// boot app modules
const bootModules = async () => {
  for (const module of modules) {
    await module.boot(app);
  }
};

const onDataSourceEstablished = async () => {
  if (DATABASE["SYNC"]) {
    debug("Start database synchronization...");
    await dataSource.sync();
  }

  // boot app module after datasource established successfully
  await bootModules();
};

dataSource
  .authenticate()
  .then(async () => {
    debug("Database connection has been established successfully!");
    await onDataSourceEstablished();
  })
  .catch((err) => {
    console.error(err);
    throw Error("Unable to connect to the database!");
  });

const app = express();
app.use(logger("combined"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static(path.resolve("public")));

// must be register app modules before "page not found" middleware
registerModules();

// page not found
app.use((req, res) => res.sendStatus(404));

module.exports = app;
