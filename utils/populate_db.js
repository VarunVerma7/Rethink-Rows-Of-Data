const Content = require("../models/Content");
var randomWords = require("random-words");

const populateDB = async () => {
  for (var i = 0; i < 1000; i++) {
    let word = randomWords();
    let content = new Content({
      content: word,
    });
    await content.save();
  }
};

module.exports = populateDB;
