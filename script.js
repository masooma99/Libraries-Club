// const Book = require("../models/Book")
// const LibraryBook = require("../models/LibraryBook")
// const userDiv = document.querySelectorAll(".userBook")

// userDiv.forEach((div) => {
//   div.addEventListener("click", async (req, res) => {
//     console.log(div.id)
//     const userBooks = await LibraryBook.find({ user: req.session.user })
//     const bookDetails = await Book.findOne({ id: userBooks[div].book })

//     return res.render("../views/auth/booksTitel.ejs", { bookDetails })
//   })
// })
