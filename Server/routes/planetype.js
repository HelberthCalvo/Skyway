const express = require("express");
const router = express.Router();
const routeController = require("../controllers/planetypeController");

router.get("/", routeController.get);

router.get("/:id", routeController.getById);

router.post("/", routeController.create);

router.put("/:id", routeController.update);

router.delete("/:id", routeController.delete);

module.exports = router;