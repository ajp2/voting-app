const mongoose = require("mongoose");
const Poll = require("./Poll");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  userPolls: [String],
  test: [String]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
