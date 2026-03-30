const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")
const User = require("../models/User")

const createBook = async (req, res) => {
  try {
    const bookInDB = await Book.exists({ title: req.body.title })
    const user = await User.findOne({ email: req.session.user.email })

    let tempBook

    if (bookInDB) {
      const bookId = await Book.findOne({ title: req.body.title })
      tempBook = bookId
      // res.send("This book is already added in the DB")
    } else {
      const newBook = await Book.create({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        numOfPages: req.body.numOfPages,
        author: req.body.author,
      })
      tempBook = newBook
    }

    if (!(await LibraryBook.exists({ book: tempBook._id }))) {
      await LibraryBook.create({
        numOfCopies: req.body.numOfCopies,
        book: tempBook,
        user: req.session.user,
      })
    }
    const userBooks = await LibraryBook.find({ user: req.session.user })

    let books_detail = []
    for (let i = 0; i < userBooks.length; i++) {
      const book_details = await Book.findOne({ _id: userBooks[i].book._id })
      books_detail.push(book_details)
    }

    const libraryDetails = {
      user: user,
      userBooks: books_detail,
    }
    console.log(userBooks)
    req.session.save(() => {
      return res.render("../views/userPage.ejs", { libraryDetails })
    })
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const findByTitle = async (req, res) => {
  try {
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const getAllBook = async (req, res) => {}

const getAllBooksByLibraryId = async (req, res) => {}

module.exports = {
  createBook,
  findByTitle,
  getAllBook,
  getAllBooksByLibraryId,
}
