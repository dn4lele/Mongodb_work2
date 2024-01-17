const controller = require("../controllers/author");
const router = require("express").Router();

router.post("/", controller.createAuthor);
router.patch("/:id", controller.updateAuthor);
router.get("/getBooks/:id/:from", controller.getAllBooks);

module.exports = router;
