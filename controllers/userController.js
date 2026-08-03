const User = require("../models/User")
const Book = require("../models/Book")
const Review = require("../models/Review")
const LibraryBook = require("../models/LibraryBook")

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
    const allReviews = await Review.find({ book: book._id })

    let usersReview = []
    for (let i = 0; i < allReviews.length; i++) {
      const userData = await User.findOne({ _id: allReviews[i].user })
      usersReview.push(userData)
    }

    let bookReviews = {
      allReviews: allReviews,
      users: usersReview,
      book: book,
    }
    console.log(allReviews)
    res.render("../views/auth/booksTitle.ejs", { bookReviews })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email })
    const userBooks = await LibraryBook.find({ user: user })

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
    console.log(libraryDetails)
    req.session.save(() => {
      return res.render("../views/userPage.ejs", { libraryDetails })
    })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

// const goHomePage = async (req, res) => {
//   try {
//     const books = await Book.find()
//     res.render("/views/home.ejs", { books: books })
//   } catch (error) {
//     console.error("⚠️ An error has occurred going to home page!", error.message)
//   }
// }

module.exports = {
  getBookById,
  getUserById,
  // goHomePage,
}
