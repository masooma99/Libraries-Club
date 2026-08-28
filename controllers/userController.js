const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")
const User = require("../models/User")

const getUserById = async (req, res) => {
  try {
    if (!req.params.id || !require("mongoose").isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid user ID")
    }

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send("User not found")
    }

    const userBooks = await LibraryBook.find({ user: user._id })

    let books_detail = []
    for (let i = 0; i < userBooks.length; i++) {
      const book_details = await Book.findOne({ _id: userBooks[i].book })
      if (book_details !== null) {
        books_detail.push(book_details)
      }
    }

    const libraryDetails = {
      user: user,
      userBooks: books_detail,
    }
    // console.log(user)
    req.session.save(() => {
      return res.render("../views/userPage.ejs", { libraryDetails })
    })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const homePage = async (req, res) => {
  const books = await Book.find()
  const user = await User.findOne({ email: req.session.user.email })
  console.log(user)
  res.render("home", { books: books, user: user })
}

module.exports = {
  getUserById,
  homePage,
}
