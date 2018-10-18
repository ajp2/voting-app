const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema(
  {
    title: String,
    user: String,
    options: [
      {
        option: String,
        value: Number
      }
    ]
  },
  { timestamps: true }
);

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;
