const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")

// router.put("/true", authController.changeAllOldAccountToLibrary)
router.post("/sign-up", authController.registerUser)
router.get("/sign-up", (req, res) => {
  res.render("../views/auth/sign-up.ejs")
})
router.post("/sign-in", authController.signInUser)
router.get("/sign-in", (req, res) => {
  res.render("./auth/sign-in.ejs")
})
router.get("/sign-out", authController.signOutUser)
router.put("/:id", authController.updatePassword)
router.get("/:id/update-password", (req, res) => {
  res.render("auth/update-password.ejs")
})
router.post("/admin/:id", authController.adminUser)

module.exports = router
