const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")
const User = require("../models/User")
// const userDiv = document.querySelectorAll(".userBook")

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
        picture: req.body.picture,
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
      if (book_details !== null) {
        books_detail.push(book_details)
      }
    }

    console.log(books_detail)

    const libraryDetails = {
      user: user,
      userBooks: books_detail,
      Book: Book,
      LibraryBook: LibraryBook,
    }
    // console.log(userBooks)
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

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find({})
    res.render("../views/home.ejs", { books })
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const getAllBooksByLibraryId = async (req, res) => {}

const updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })

    res.redirect(`/books/${book._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred updating a book!", error.message)
  }
}

const deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete({ _id: req.params.bookid })
    console.log(deletedBook)
    const books = await Book.find()
    res.render("../views/home.ejs", { books: books })
    // res.render("../views/home.ejs")
    // res.redirect("/users/home")
  } catch (error) {
    console.error("⚠️ Error deleting book:", error.message)
  }
}

module.exports = {
  createBook,
  findByTitle,
  getAllBook,
  getAllBooksByLibraryId,
  updateBookById,
  deleteBookById,
}
