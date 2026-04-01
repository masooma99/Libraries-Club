const Book = require("../models/Book")
const User = require("../models/User")
const Review = require("../models/Review")

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
    res.render("../views/reviewPage.ejs", { book })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const createReview = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email })
    const book = await Book.findOne({ _id: req.params.id })

    const allReviews = await Review.find({ _id: book.id })

    await Review.create({
      rating: req.body.rating,
      comment: req.body.comment,
      user: user,
      book: book,
    })

    req.session.save(() => {
      return res.render("../views/auth/booksTitel.ejs", { allReviews })
    })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

module.exports = {
  getBookById,
  createReview,
}
