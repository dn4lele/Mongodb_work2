const Books = require("../models/books");
const Author = require("../models/author");

module.exports = {
  createBooks: async (books) => {
    let createdBooks = books;

    if (!(books instanceof Array)) createdBooks = [books];

    const newbooks = Books.insertMany(createdBooks);

    return newbooks;
  },
  getAllBooks: async (from) => {
    const pagesize = 10;
    const pagenumber = from;
    const allbooks = Books.find({})
      .skip(pagesize * pagenumber)
      .limit(pagesize);
    return allbooks;
  },
  removeBook: async (id) => {
    const book = Books.deleteOne({ _id: id });
    return book;
  },
  getBookByName: async (partofname, from) => {
    const pagesize = 10;
    const pagenumber = from;
    const book = Books.find({ $text: { $search: partofname } })
      .skip(pagesize * pagenumber)
      .limit(pagesize);

    return book;
  },

  getBookByGenre: async (genres, from) => {
    const pagesize = 10;
    const pagenumber = from;

    const book = Books.find({ genres: genres })
      .skip(pagesize * pagenumber)
      .limit(pagesize);

    return book;
  },
  getBooksByPublishingYearRange: async (startYear, endYear, from) => {
    const pageSize = 10;
    const pageNumber = from;

    const books = await Books.find({
      publishingyear: { $gte: startYear, $lte: endYear },
    })
      .skip(pageSize * pageNumber)
      .limit(pageSize);

    return books;
  },
  getBooksByAuthorCountry: async (country, from) => {
    const pageSize = 10;
    const pageNumber = from;

    const books = await Books.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authors",
        },
      },
      { $match: { "authors.county": country } },
    ])
      .skip(pageSize * pageNumber)
      .limit(pageSize);

    return books;
  },
};
