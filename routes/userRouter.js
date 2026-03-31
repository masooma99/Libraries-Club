const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/", userController.testing)
router.get("/:id", userController.getBookById)

module.exports = router
