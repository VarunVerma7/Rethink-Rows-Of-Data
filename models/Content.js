const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var randomWords = require("random-words");

let ContentSchema = Schema({
  content: {
    type: String,
  },
});

module.exports = Content = mongoose.model("Content", ContentSchema);
