const { Router } = require("express");
const router = Router();

router.get("/user", function (req, res) {
  res.send("User Module");
});

module.exports = router;
