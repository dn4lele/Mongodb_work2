const {
  createOrder,
  findMaxOrder,
  find3Genres,
  timetotalprice,
  top3Authors,
} = require("../services/orders");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const orderItems = req.body;
      const Orders = await createOrder(orderItems);
      res.json(Orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  findMaxOrder: async (req, res) => {
    try {
      const { start_date, end_date } = req.body;
      const topPrice = await findMaxOrder(start_date, end_date);
      res.json(topPrice);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  find3Genres: async (req, res) => {
    try {
      const { start_date, end_date } = req.body;

      const topPrice = await find3Genres(start_date, end_date);
      res.json(topPrice);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  timetotalprice: async (req, res) => {
    try {
      const { start_date, end_date } = req.body;
      const topPrice = await timetotalprice(start_date, end_date);
      res.json(topPrice);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  top3Authors: async (req, res) => {
    try {
      const { start_date, end_date } = req.body;
      const topPrice = await top3Authors(start_date, end_date);
      res.json(topPrice);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
