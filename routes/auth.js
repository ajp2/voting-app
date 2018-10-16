const router = require("express").Router();
const passport = require("passport");

router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/polls");
});

module.exports = router;
