const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderItemsschema = new Schema({
  bookId: ObjectId,
  amount: Number,
});

const ordersschema = new Schema({
  items: [orderItemsschema],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const orders = model("orders", ordersschema);
module.exports = orders;
