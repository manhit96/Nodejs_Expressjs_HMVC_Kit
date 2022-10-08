const { Router } = require("express");
const router = Router();

router.get("/", function (req, res) {
  res.send("Hello World!");
});

router.get("/core", function (req, res) {
  res.send("Core Module");
});

module.exports = router;
