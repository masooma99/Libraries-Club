const express = require("express")
const router = express.Router()

const bookController = require("../controllers/bookController")

router.post("/create", bookController.createBook)
router.get("/create", (req, res) => {
  res.render("../views/createBook.ejs")
})
router.put("/:id", bookController.updateBookById)
router.delete("/:id", bookController.deleteBookById)

module.exports = router
