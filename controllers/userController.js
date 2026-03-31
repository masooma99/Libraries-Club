const User = require("../models/User.js")
const Book = require("../models/Book")

const testing = async (req, res) => {
  try {
    res.send("testing is successfully done")
  } catch (error) {
    res.send("Error while testing")
    console.log(error)
  }
}

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })

    // res.send(book)

    res.render("../views/auth/booksTitel.ejs", { book })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

module.exports = {
  testing,
  getBookById,
}
