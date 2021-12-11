const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.get("/", flightController.get);

router.get("/:id", flightController.getById);

router.get("/date/:id", flightController.getByDate);

router.post("/", flightController.create);

router.delete("/:id", flightController.delete);

router.put("/:id", flightController.update);

module.exports = router;