const Book = require("../models/Book")
const User = require("../models/User")
const Review = require("../models/Review")

const getBookById = async (req, res) => {
  try {
    //this function is for thr review form

    // const book = await Book.findOne({ _id: req.params.id })
    const book = await Book.findOne({ _id: req.params.id })
    // const allReviews = await Review.find({ _id: book.id })

    // let bookReviews = {
    //   allReviews: allReviews,
    //   book: book,
    // }

    res.render("../views/reviewPage.ejs", { book })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const createReview = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email })
    const book = await Book.findOne({ _id: req.params.id })

    await Review.create({
      rating: req.body.rating,
      comment: req.body.comment,
      user: user,
      book: book,
    })
    const allReviews = await Review.find({ book: book.id })

    let usersReview = []
    let userData
    for (let i = 0; i < allReviews.length; i++) {
      userData = await User.findOne({ _id: allReviews[i].user })
      usersReview.push(userData)
    }

    let bookReviews = {
      allReviews: allReviews,
      users: usersReview,
      book: book,
      user: user,
    }
    console.log(usersReview)
    console.log(allReviews)

    // req.session.save(() => {
    res.render("../views/auth/booksTitle.ejs", { bookReviews })
    // })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

const deleteReview = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.session.user.email })
    const reviewUser = await Review.findOne({ _id: req.params.id }).populate(
      "user"
    )
    //make sure that they are the same
    // console.log(loggedInUser._id)
    // console.log(reviewUser.user._id)
    //when I added the String() it did work
    if (String(loggedInUser._id) == String(reviewUser.user._id)) {
      //he will be able to delete his comment
      // console.log("you can delete this review")
      const bookId = reviewUser.book
      const deletedReview = await Review.findOneAndDelete({
        _id: reviewUser._id,
      })
      return res.redirect(`/users/${bookId}`)
      // console.log(deletedReview)
      //deleting the user review did work
    } else {
      console.log("you can not delete this review")
      res.send("<script>history.back();</script>")
      // res.send('<script>history.go(-2);</script>');  ----> if I want to go back by many steps.
    }
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a review!", error.message)
  }
}

const editReview = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.session.user.email })
    const reviewUser = await Review.findOne({ _id: req.params.id }).populate(
      "user"
    )
    if (String(loggedInUser._id) == String(reviewUser.user._id)) {
      return res.render("../views/auth/editReview.ejs", { review: reviewUser })
    } else {
      console.log("You can NOT edit this review, it is not yours!")
      return res.send("<script>history.back();</script>")
    }
  } catch (error) {
    console.error("⚠️ An error has occurred editing a review!", error.message)
  }
}

const updateReview = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ email: req.session.user.email })
    const reviewUser = await Review.findById(req.params.id)

    if (!reviewUser || String(loggedInUser._id) != String(reviewUser.user)) {
      return res.send("<script>history.back();</script>")
    }

    await Review.findByIdAndUpdate(req.params.id, {
      rating: req.body.rating,
      comment: req.body.comment,
    })

    return res.redirect(`/users/${reviewUser.book}`)
  } catch (error) {
    console.error("⚠️ An error has occurred updating a review!", error.message)
  }
}

module.exports = {
  getBookById,
  createReview,
  deleteReview,
  editReview,
  updateReview,
}
