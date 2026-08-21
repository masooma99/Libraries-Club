const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")

router.get("/:id", reviewController.getBookById)

router.post("/:id", reviewController.createReview)
router.delete("/delete/:id", reviewController.deleteReview) //id of the review
router.put("/edit/:id", reviewController.editReview)

module.exports = router
