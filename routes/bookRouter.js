const express = require("express")
const router = express.Router()
const Book = require('../models/Book')
const bookController = require("../controllers/bookController")

router.post("/create", bookController.createBook)
router.get("/create", (req, res) => {
  res.render("../views/createBook.ejs")
})
router.put("/:id", bookController.updateBookById)
router.delete("/:id", bookController.deleteBookById)

router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id)

  res.render('books/edit', { book })
})
module.exports = router
