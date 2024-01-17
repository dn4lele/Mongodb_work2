const bodyParser = require("body-parser");
const express = require("express");
const authorRouter = require("./routes/author");
const booksRouter = require("./routes/books");
const orderRouter = require("./routes/orders");

const app = express();
app.use(bodyParser.json());
app.use("/api/Author", authorRouter);
app.use("/api/Books", booksRouter);
app.use("/api/Orders", orderRouter);

module.exports = app;
