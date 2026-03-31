const Book = require("../models/Book")

const testing = async (req, res) => {
  try {
    res.send("testing is successfully done")
  } catch (error) {
    res.send("Error while testing")
    console.log(error)
  }
}

const showHome = async (req, res) => {
  try {
    const allBooks = await Book.find().limit(3)

    res.render("home", {
      books: allBooks,
      user: req.session.user || null,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send("Error loading home page")
  }
}

module.exports = {
  testing,
  showHome,
}
