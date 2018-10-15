const router = require("express").Router();
const url = require("../controllers/url");

router.get("/", (req, res) => {
  res.redirect("/polls");
});

router.get("/polls", url.displayPolls);

router.get("/polls/:id", url.displayOne);

router.get("/mypolls", url.myPolls);

router.get("/newpoll", url.create);

module.exports = router;
