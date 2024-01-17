const Author = require("../models/author");
const Books = require("../models/books");

module.exports = {
  createAuthor: async (name, county) => {
    const newAuthor = new Author({ name, county });
    return newAuthor.save();
  },
  updateAuthor: async (id, updatedAuthor) => {
    const author = await Author.updateOne({ _id: id }, updatedAuthor);
    return author;
  },
  getAllBooks: async (id, from) => {
    const pagesize = 10;
    const pagenumber = from;

    const books = await Books.find({ authors: id })
      .skip(pagesize * pagenumber)
      .limit(pagesize);

    return books;
  },
};
