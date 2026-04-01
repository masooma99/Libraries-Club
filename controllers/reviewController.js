const Book = require("../models/Book")

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
    res.render("../views/reviewFormPage.ejs", { book })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

module.exports = {
  getBookById,
}
