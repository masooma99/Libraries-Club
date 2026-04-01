const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

<<<<<<< HEAD
router.get("/books/:id", userController.getBookById)
=======
router.get("/:id", userController.getBookById)
>>>>>>> 7b2af86d22964e02eddbb381e7ca0ac3ed62ba6f
router.get("/", userController.getUserById)

module.exports = router
