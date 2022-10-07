const debug = require("debug")("[App]");
const path = require("path");
const glob = require("glob");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(logger("combined"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static(path.resolve("public")));

// import modules
const modules = [];
glob.sync(__dirname + "/modules/*").forEach((file) => {
  const module = require(file);
  debug("Import module: %O", { name: module.name, path: file });

  const isExist = modules.find((item) => item.name === module.name);
  if (isExist) throw Error(`Duplicate module "${module.name}"`);

  modules.push(module);
});

for (const module of modules) {
  app.use(module.routes);
}

// not found page/url
app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
