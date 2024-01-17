const {
  createBooks,
  getAllBooks,
  removeBook,
  getBookByName,
  getBookByGenre,
  getBooksByPublishingYearRange,
  getBooksByAuthorCountry,
} = require("../services/books");

module.exports = {
  createBooks: async (req, res) => {
    try {
      const books = req.body;
      const newbooks = await createBooks(books);
      res.json(newbooks);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const from = req.params.from;

      const allbooks = await getAllBooks(from);
      res.json(allbooks);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  removeBook: async (req, res) => {
    try {
      const bookid = req.params.id;
      const removedbook = await removeBook(bookid);
      res.json(removedbook);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByName: async (req, res) => {
    try {
      const partofname = req.params.partname;
      const from = req.params.from;

      const book = await getBookByName(partofname, from);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getBookByGenre: async (req, res) => {
    try {
      const genres = req.params.genres;
      const from = req.params.from;

      const book = await getBookByGenre(genres, from);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBooksByPublishingYearRange: async (req, res) => {
    try {
      const { startYear, endYear, from } = req.params;

      const book = await getBooksByPublishingYearRange(
        startYear,
        endYear,
        from
      );
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBooksByAuthorCountry: async (req, res) => {
    try {
      const { country, from } = req.params;

      const book = await getBooksByAuthorCountry(country, from);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
