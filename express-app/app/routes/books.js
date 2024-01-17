const controller = require("../controllers/books");
const router = require("express").Router();

router.post("/", controller.createBooks);

router.get("/ten/:from", controller.getAllBooks);
router.get("/title/:partname/:from", controller.getBookByName);
router.get("/genres/:genres/:from", controller.getBookByGenre);
router.get(
  "/years/:startYear/:endYear/:from",
  controller.getBooksByPublishingYearRange
);
router.get("/Author/:country/:from", controller.getBooksByAuthorCountry);

router.delete("/:id", controller.removeBook);

module.exports = router;
