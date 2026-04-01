const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
    res.render("home", { books })
  } catch (error) {
    res.render("home", { books: [] })
  }
})

module.exports = router
