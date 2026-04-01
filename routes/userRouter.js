const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

const userController = require("../controllers/userController")

<<<<<<< HEAD
router.get("/", userController.testing)
router.get("/home", (req, res) => {
  res.render("../views/home.ejs", { Book })
})
router.get("/bookstitle", (req, res) => {
  res.render("../views/auth/booksTitel.ejs")
})
=======
<<<<<<< HEAD
router.get("/books/:id", userController.getBookById)
=======
router.get("/:id", userController.getBookById)
>>>>>>> 7b2af86d22964e02eddbb381e7ca0ac3ed62ba6f
router.get("/", userController.getUserById)
>>>>>>> 8010f8d25896eca793f995bebc66408ba57788bb

module.exports = router
