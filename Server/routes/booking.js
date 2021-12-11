const express = require("express");
const router = express.Router();
const bookingModel = require("../controllers/bookingController");

router.get("/", bookingModel.get);

router.get("/:id", bookingModel.getById);

router.get("/flight/:id", bookingModel.getByFlight);

router.get("/user/:id", bookingModel.getByUser);

router.post("/", bookingModel.create);

router.put("/:id", bookingModel.update);

router.delete("/:id", bookingModel.delete);

module.exports = router;