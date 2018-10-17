const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: String,
  options: [
    {
      option: String,
      value: Number
    }
  ]
});

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;
