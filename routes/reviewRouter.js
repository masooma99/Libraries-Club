const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")

router.get("/:id", reviewController.getBookById)

router.post("/:id", reviewController.createReview)
// router.get("/:id", reviewController.createReview)

module.exports = router
