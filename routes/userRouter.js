const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

const userController = require("../controllers/userController")

router.get("/", userController.testing)
router.get("/home", (req, res) => {
  res.render("../views/home.ejs", { Book })
})
module.exports = router
