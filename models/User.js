const mongoose = require("mongoose");
// const Poll = require("./Poll");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: String,
  options: [
    {
      option: String
    }
  ]
});

const userSchema = new Schema({
  username: String,
  googleId: String,
  userPolls: [pollSchema]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
