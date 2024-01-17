const {
  createAuthor,
  updateAuthor,
  getAllBooks,
} = require("../services/author");

module.exports = {
  createAuthor: async (req, res) => {
    try {
      const { name, county } = req.body;
      const newAuthor = await createAuthor(name, county);
      res.json(newAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateAuthor: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAuthor = req.body;

      const Author = await updateAuthor(id, updatedAuthor);
      res.json(Author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const { id, from } = req.params;

      const books = await getAllBooks(id, from);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
