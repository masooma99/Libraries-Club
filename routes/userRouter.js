const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/:id", userController.getBookById)
router.get("/", userController.getUserById)
// router.get("/home", userController.goHomePage)

module.exports = router
