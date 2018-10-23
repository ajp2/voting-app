const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passportSetup");
const errorHandler = require("./controllers/error");
const pollRoutes = require("./routes/polls");
const authRoutes = require("./routes/auth");
const keys = require("./config/keys");

const app = express();
const port = process.env.PORT || 5000;

// Set up view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// Parsing middleware
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Error connecting to the database: " + err);
  });
mongoose.Promise = global.Promise;

// Define routes here
app.use("/", pollRoutes);
app.use("/auth", authRoutes);

// Error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(process.env.DB_HOST);
});
