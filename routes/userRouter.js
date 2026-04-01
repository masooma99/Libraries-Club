const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

const userController = require("../controllers/userController")

<<<<<<< HEAD
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
=======

>>>>>>> 8fd734880ebe24f6f2731ff56d52ed4aec4d621a
router.get("/:id", userController.getBookById)

router.get("/", userController.getUserById)
>>>>>>> 8010f8d25896eca793f995bebc66408ba57788bb

module.exports = router
