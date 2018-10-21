const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");

// const url = require("../controllers/url");

router.get("/", (req, res) => {
  res.redirect("/polls");
});

router.get("/polls", async (req, res) => {
  const allPolls = await Poll.find({}, "id title").sort({ createdAt: -1 });
  res.render("home", { user: req.user, allPolls: allPolls });
});

router.get("/polls/:pollId", async (req, res) => {
  const currentPoll = await Poll.findById(req.params.pollId);
  res.render("poll", { user: req.user, currentPoll: currentPoll });
});

router.get("/mypolls", async (req, res) => {
  // find polls that have the same user id as the current user and sort by most recent
  const polls = await Poll.find({ user: req.user.id }, "id title").sort({
    createdAt: -1
  });

  res.render("myPolls", { user: req.user, polls: polls });
});

router
  .get("/newpoll", (req, res) => {
    res.render("createPoll", { user: req.user });
  })
  .post("/newpoll", (req, res) => {
    // get values from input fields
    let optionsArr = req.body.options.map(option => {
      return { option: option };
    });
    let poll = {
      title: req.body.name,
      user: req.user.id,
      options: optionsArr
    };

    // save the new poll to the db
    Poll.create(poll).then(poll => {
      res.redirect("/polls/" + poll.id);
    });
  });

router.post("/polls/vote/:pollId", async (req, res) => {
  // if user chooses to add another option, add it to the db
  if (req.body["add-option"]) {
    await Poll.update(
      { _id: req.params.pollId },
      {
        $push: { options: { option: req.body["add-option"], value: 1 } }
      }
    );
  }
  // otherwise increment the counter for the option chosen
  else {
    await Poll.findOne({ _id: req.params.pollId }, (err, poll) => {
      poll.options.forEach(item => {
        if (item.option === req.body["select-vote"]) {
          item.value += 1;
        }
      });
      poll.save();
    });
  }

  res.redirect("/polls/" + req.params.pollId);
});

module.exports = router;
