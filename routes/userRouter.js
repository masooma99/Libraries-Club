const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/home", userController.homePage)
router.get("/:id", userController.getUserById)

module.exports = router
