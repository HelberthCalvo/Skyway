const express = require("express");
const router = express.Router();
const planeController = require("../controllers/planeController");

router.get("/", planeController.get);

router.get("/:id", planeController.getById);

router.post("/", planeController.create);

router.put("/:id", planeController.update);

router.delete("/:id", planeController.delete);

module.exports = router;