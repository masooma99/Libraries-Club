const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")
const User = require("../models/User")

const createBook = async (req, res) => {}

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
