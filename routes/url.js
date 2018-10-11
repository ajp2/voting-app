module.exports = app => {
  const url = require("../controllers/url");

  app.get("/polls", url.displayPolls);

  app.get("/polls/:id", url.displayOne);

  app.get("/mypolls", url.myPolls);

  app.get("/newpoll", url.create);
};
