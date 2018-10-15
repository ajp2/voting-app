const router = require("express").Router();

router.get("/login", (req, res) => {
  res.send("auth");
});

router.get("/logout", (req, res) => {
  res.send("auth");
});

router.get("/twitter", (req, res) => {
  res.send("auth");
});

router.get("/twitter/redirect", (req, res) => {
  res.send("auth");
});

module.exports = router;
