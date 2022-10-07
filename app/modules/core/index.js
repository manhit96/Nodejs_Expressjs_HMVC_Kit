module.exports = {
  name: "Core",
  config: require("./config"),
  routes: require("./routes"),
  middleware: require("./middleware"),
  controllers: require("./controllers"),
  entities: require("./entities"),
  repositories: require("./repositories"),
  services: require("./services"),
  utils: require("./utils"),
};
