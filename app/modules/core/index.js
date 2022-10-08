const { basename } = require("path");
const path = __dirname;
const name = basename(path);
const version = "1.0.0";
const priority = 0; // module load priority

const debug = require("debug")(`module:${name}`);

const config = require("./config");
const middleware = require("./middleware");
const controllers = require("./controllers");
const entities = require("./entities");
const repositories = require("./repositories");
const routes = require("./routes");
const services = require("./services");
const utils = require("./utils");

const register = async (app, callback) => {
  debug("register...");

  app.use(routes);

  if (typeof callback == "function") callback();
};

const boot = async (app, callback) => {
  debug("boot...");

  if (typeof callback == "function") callback();
};

module.exports = {
  priority,
  name,
  version,
  path,
  register,
  boot,
  config,
  middleware,
  controllers,
  entities,
  repositories,
  routes,
  services,
  utils,
};
