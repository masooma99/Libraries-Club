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
// these 2 function are the same they'll just take me to different pages
router.post("/search", bookController.searchByBookTitle)
router.get("/create/search", bookController.searchBookPage)
router.post("/create/search", bookController.searchBook)
router.post("/create/search/add", bookController.createLibraryBook)

module.exports = router
