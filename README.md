# Voting App

Create and vote on polls.

![Home Page](/docs/homepage_screenshot.png)

## Features

### Authentication using OAuth

Login using your Google account

```
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have the user
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
```

### CRUD Functionality on Polls

Logged in users can create and delete their own polls, and create new options on any polls.

```
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
  await setTimeout(() => {}, 50);

  res.redirect("/polls/" + req.params.pollId);
};
```

### Display Polls using ZingCharts

```
zingchart.render({
    id: 'myChart',
    data: {
      "type": "bar",
      "plot": {
        "value-box": {
          "text": "%v"
        },
        "tooltip": {
          "text": "%v"
        }
      },
      "series": [
        {
          "values": options
        },
      ]
    }
  });
```

![Home Page](/docs/poll_screenshot.png)

## Technologies Used

- JavaScript
- Node.js
- Express
- EJS
- MongoDB
- Passport, OAuth
- Bootstrap
