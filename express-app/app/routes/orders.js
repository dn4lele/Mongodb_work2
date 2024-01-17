const controller = require("../controllers/orders");
const router = require("express").Router();

router.post("/", controller.createOrder);

router.get("/getmax", controller.findMaxOrder);
router.get("/top3geners", controller.find3Genres);
router.get("/totaltime", controller.timetotalprice);
router.get("/top3Authors", controller.top3Authors);

module.exports = router;
