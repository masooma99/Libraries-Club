const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/:id", userController.getBookById)

router.get("/", userController.getUserById)

router.get("/home", (req, res) => {
  console.log("home page")
  res.render("../views/home.ejs", { Book })
})

module.exports = router
