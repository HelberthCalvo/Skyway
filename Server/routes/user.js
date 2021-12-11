const express = require ("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.post("/", userController.create);

router.put("/:id", userController.update);

router.get("/", userController.get);

router.get("/:id", userController.getById);

router.delete("/:id", userController.delete);


module.exports = router;