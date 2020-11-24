const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const populateDB = require("./utils/populate_db");
const Content = require("./models/Content");

// Uncomment to populate DB
// populateDB();

// const rows = mongoose.model("rows");
// const Rows = mongoose.model("Row", new Schema({ "  content": String }), "row");
connectDB().then(() => {});

app.use(express.json({ extended: false }));

app.post("/api", (req, res) => {
  let term = req.body.term;
  let skip = req.body.skip;
  let arr2;
  console.log("SERVER");
  const regex = new RegExp(term, "i");
  Content.find({ content: { $regex: regex } })
    .limit(20)
    .skip(skip * 20)
    .sort("-createdOn")
    .then((arr) => {
      arr2 = arr.map((el) => el.content);
      res.send(arr2);
    });
});

app.listen(5000, () => console.log("Running on port 6000"));
