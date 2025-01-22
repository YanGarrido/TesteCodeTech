const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require("../middleware/authMidleware");

router.get("/:id", checkToken, userController.getUserById);

module.exports = router;
