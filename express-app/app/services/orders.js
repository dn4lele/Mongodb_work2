const Author = require("../models/author");
const Books = require("../models/books");
const Orders = require("../models/orders");

module.exports = {
  createOrder: async (orderItems) => {
    let totalPrice = 0;

    //calc total price
    //and check if it have enouph quentity

    let flag = true;
    for (const orderItem of orderItems) {
      const book = await Books.findById(orderItem.bookId);

      if (!book) {
        flag = false; //if book not exist
      }

      if (book.quantity < orderItem.amount) {
        flag = false; // asking for too much quantity
      }

      await Books.updateOne(
        // update the quantity of the book
        { _id: orderItem.bookId },
        { quantity: book.quantity - orderItem.amount }
      );

      totalPrice += book.price * orderItem.amount;
    }

    let newOrder;
    if (flag) {
      newOrder = new Orders({ items: orderItems, totalPrice });
      return newOrder.save();
    }
    return "asking too much books";
  },

  findMaxOrder: async (startDate, endDate) => {
    const maxOrder = await Orders.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ totalPrice: -1 })
      .limit(1);

    return maxOrder;
  },
  find3Genres: async (startDate, endDate) => {
    const topGenres = await Orders.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          // Assuming your Books collection is named "books"
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.genres",
      },
      {
        $group: {
          _id: "$book.genres",
          count: {
            $sum: 1, //$sum: "$items.amount" if i buy 7 books so +7 on that genere
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

    return topGenres.map((genre) => genre._id);
  },

  timetotalprice: async (startDate, endDate) => {
    const totlaprice = await Orders.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: 1,
          totalCost: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    if (!totlaprice) return 0;
    return totlaprice[0].totalCost;
  },

  top3Authors: async (startDate, endDate) => {
    const top3auth = await Orders.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$book.authors",
      },
      {
        $group: {
          _id: "$book.authors",
          totalBooksSold: {
            $sum: "$items.amount",
          },
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "_id",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      {
        $unwind: "$authorDetails",
      },
      {
        $project: {
          _id: "$authorDetails._id",
          name: "$authorDetails.name",
          totalBooksSold: 1,
        },
      },
      {
        $sort: {
          totalBooksSold: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    return top3auth.map((author) => author.name);
  },
};
