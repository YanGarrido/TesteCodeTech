const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.post("/students", studentController.createStudent);
router.get("/students", studentController.listStudent);
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
