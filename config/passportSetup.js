const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");
const keys = require("./keys");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitter.consumerKey,
      consumerSecret: keys.twitter.consumerSecret,
      callbackURL: "/auth/twitter/redirect"
    },
    (token, tokenSecret, profile, cb) => {
      // check if user already exists in our db
      console.log(profile);
    }
  )
);
