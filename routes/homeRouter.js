const express = require("express")
const router = express.Router()
const Book = require("../models/Book")
const User = require("../models/User")

router.get("/home", async (req, res) => {
  const books = await Book.find()
  const user = await User.findOne({ email: req.session.user.email })
  console.log(user)
  res.render("home", { books: books, user: user })
})

router.get("/search", async (req, res) => {
  const book = await Book.findOne()
  res.render("bookstitel", { book: book })
})

module.exports = router
