exports.displayPolls = (req, res) => {
  res.render("home", { user: req.user });
};

exports.displayOne = (req, res) => {
  res.render("poll", { pollName: req.params.id });
};

exports.myPolls = (req, res) => {
  res.send("here are my polls");
};

exports.create = (req, res) => {
  res.send("create a new poll here");
};
