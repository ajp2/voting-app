const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");

// const url = require("../controllers/url");

router.get("/", (req, res) => {
  res.redirect("/polls");
});

router.get("/polls", (req, res) => {
  console.log(req.user);
  res.render("home", { user: req.user });
});

router.get("/polls/:id", (req, res) => {
  res.render("poll", { user: req.user, pollName: req.params.id });
});

router.get("/mypolls", (req, res) => {
  User.find({ id: req.user.id }, "userPolls", function(err, polls) {
    console.log(polls);
  });
  res.render("myPolls", { user: req.user });
});

router
  .get("/newpoll", (req, res) => {
    res.render("createPoll", { user: req.user });
  })
  .post("/newpoll", (req, res) => {
    let optionsArr = req.body.options.map(option => {
      return { option: option, value: 0 };
    });
    let poll = {
      title: req.body.name,
      options: optionsArr
    };

    Poll.create(poll)
      .then(newPoll => {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { userPolls: newPoll.id } }
        ).then(() => {
          res.redirect("/polls");
        });
      })
      .catch(err => {
        res.send({ messag: err || "Error saving poll to db" });
      });
  });

module.exports = router;
