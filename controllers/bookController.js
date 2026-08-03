const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")
const User = require("../models/User")
const Review = require("../models/Review")
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

    if (
      !(await LibraryBook.exists({
        book: tempBook._id,
        user: req.session.user,
      }))
    ) {
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
    const user = await User.findOne({ email: req.session.user.email })
    const userBook = await LibraryBook.findOne({
      book: req.params.bookid,
      user: user,
    })
    //delete the LibraryBook where the Book:... and the User:...
    const deletedLibraryBook = await LibraryBook.findByIdAndDelete({
      _id: userBook._id,
    })
    //now check if there is another library that has the same book, if there is then do not remove it from Book table, if not the remove this book from Book table and LibraryBook table.
    const librariesHasBook = await LibraryBook.find({ book: req.params.bookid })
    if (!librariesHasBook) {
      //now if there is no other libraries has this book and it will be deleted from Book table too, then we need to delete all reviews on this book
      const bookReviews = await Review.find({ book: req.params.bookid })
      if (bookReviews) {
        //if the book have reviews then delete them before deleting the book
        for (let i = 0; i < bookReviews.length; i++) {
          await Review.findByIdAndDelete({ _id: bookReviews[i]._id })
        }
      }
      //delete the book from Book table
      let deletedBook = await Book.findByIdAndDelete({
        _id: req.params.bookid,
      })
    }
    console.log("you successfully deleted the book")
    // console.log(deletedBook)
    console.log(librariesHasBook)
    const books = await Book.find()
    res.render("../views/home.ejs", { books: books })
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
