const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const booksschema = new Schema({
  title: String,
  publishingyear: Number,
  genres: [String],
  authors: [ObjectId],
  quantity: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

const Books = model("Books", booksschema);
module.exports = Books;
