const mongoose = require("mongoose")

const libraryBookSchema = new mongoose.Schema(
  {
    numOfCopies: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("LibraryBook", libraryBookSchema)
