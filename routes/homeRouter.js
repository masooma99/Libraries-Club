const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

router.get("/", async (req, res) => {
  const books = await Book.find()
  res.render("home", { books: books })
})

router.get("/search", async (req, res) => {
  const bookTitle = req.query.bookTitle
  const book = await Book.findOne({ title: bookTitle })
  res.render("bookstitel", { book: book })
})

router.get("/title/:id", async (req, res) => {
  const book = await Book.findById(req.params.id)
  res.render("book-details", { book })
})

module.exports = router
