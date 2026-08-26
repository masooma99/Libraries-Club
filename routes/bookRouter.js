const express = require("express")
const router = express.Router()
const Book = require("../models/Book")
const bookController = require("../controllers/bookController")

router.post("/create", bookController.createBook)
router.get("/create", (req, res) => {
  res.render("../views/createBook.ejs")
})
router.get("/:id", bookController.getBookById)
router.get("/home", bookController.getAllBook)
router.get("/edit/:id", bookController.updateBookPage)
router.put("/edit/:id", bookController.updateBookById)
router.delete("/delete/:bookid", bookController.deleteBookById)
router.post("/search", bookController.searchByBookTitle)

module.exports = router
