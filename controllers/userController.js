const User = require("../models/User")
const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
    res.render("../views/auth/booksTitel.ejs", { book })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email })
    const userBooks = await LibraryBook.find({ user: user })

    let books_detail = []
    for (let i = 0; i < userBooks.length - 1; i++) {
      const book_details = await Book.findOne({ _id: userBooks[i].book._id })
      books_detail.push(book_details)
    }

    const libraryDetails = {
      user: user,
      userBooks: books_detail,
    }
    // console.log(userBooks)
    req.session.save(() => {
      return res.render("../views/userPage.ejs", { libraryDetails })
    })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}
module.exports = {
  getBookById,
  getUserById,
}
