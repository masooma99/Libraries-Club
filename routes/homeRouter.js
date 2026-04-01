const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

router.get("/home", async (req, res) => {
  const books = await Book.find()
  res.render("home", { books: books })
})

router.get("/", async (req, res) => {
  const books = await Book.find()
  res.render("home", { books: books })
})

router.get("/search", async (req, res) => {
  const book = await Book.findOne({ title: req.query.bookTitle })
  res.render("bookstitle", { books: books })
})

router.get("/title/:id", async (req, res) => {
  const book = await Book.findById(req.params.id)
  res.render("bookstitel", { book: book, user: req.session.user })
})

module.exports = router
