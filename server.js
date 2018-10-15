const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./controllers/error");
const keys = require("./config/keys");
const pollRoutes = require("./routes/polls");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// Set up view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// Connect to mongodb
mongoose
  .connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Error connecting to the database: " + err);
  });

// Define routes here
app.use(pollRoutes);
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
});
