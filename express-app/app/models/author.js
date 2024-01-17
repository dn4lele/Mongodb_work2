const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const authorschema = new Schema({
  name: String,
  county: String,
  createdAt: { type: Date, default: Date.now },
});

const Author = model("Author", authorschema);
module.exports = Author;
