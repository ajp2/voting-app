const router = require("express").Router();
const pollController = require("../controllers/controller.poll");
const auth = require("../routes/auth");

// const url = require("../controllers/url");

router.get("/", pollController.home);

router.get("/polls", pollController.displayPolls);

router.get("/polls/:pollId", pollController.displayOne);

router.get("/polls/:pollId/delete", pollController.deletePoll)

router.get("/mypolls", pollController.isLoggedIn, pollController.myPolls);

router
  .get("/newpoll", pollController.isLoggedIn, pollController.create)
  .post("/newpoll", pollController.isLoggedIn, pollController.createPoll);

router.post("/polls/vote/:pollId", pollController.votePoll);

module.exports = router;
