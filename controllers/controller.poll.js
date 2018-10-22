const Poll = require("../models/Poll");

exports.home = (req, res) => {
  res.redirect("/polls");
}

exports.displayPolls = async (req, res) => {
  const allPolls = await Poll.find({}, "id title").sort({ createdAt: -1 });
  console.log(req.user);
  res.render("home", { user: req.user, allPolls: allPolls });
}

exports.displayOne = async (req, res) => {
  const currentPoll = await Poll.findById(req.params.pollId);
  res.render("poll", { user: req.user, currentPoll: currentPoll });
}

exports.deletePoll = async (req, res) => {
  await Poll.findByIdAndDelete(req.params.pollId);
  res.redirect("/polls");
}

exports.myPolls = async (req, res) => {
  // find polls that have the same user id as the current user and sort by most recent
  const polls = await Poll.find({ user: req.user.id }, "id title").sort({
    createdAt: -1
  });
  res.render("myPolls", { user: req.user, polls: polls });
}

exports.create = (req, res) => {
  res.render("createPoll", { user: req.user });
};

exports.createPoll = (req, res) => {
  // get values from input fields
  let optionsArr = req.body.options
    .filter(option => {
      if (option) {
        return option;
      }
    })
    .map(option => {
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
}

exports.votePoll = async (req, res) => {
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

  // give the chart sometime to load
  await setTimeout(() => { }, 50);

  res.redirect("/polls/" + req.params.pollId);
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/google");
  }
}