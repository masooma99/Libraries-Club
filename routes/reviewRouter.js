const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")

router.get("/:id", reviewController.getBookById)

module.exports = router
