const bcrypt = require("bcrypt")
const User = require("../models/User")
const Book = require("../models/Book")
const LibraryBook = require("../models/LibraryBook")

const registerUser = async (req, res) => {
  try {
    //check the database for the user
    const userInDB = await User.exists({ email: req.body.email })
    if (userInDB) {
      return res.send("email already taken!")
      //render to ejs page later
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match ")
        //this will also render to ejs page later
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        picture: req.body.picture,
        typeOfUser: req.body.typeOfUser,
        address: req.body.address,
      })
      res.redirect("/auth/sign-in")
      //this will also render to ejs page later
    }
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const userBooks = await LibraryBook.find({ user: user })
    if (!user) {
      return res.send(
        "❌ No user has been registered with that email. Please sign up!"
      )
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.send("❌ Incorrect password! Please try again.")
    }
    //create the session
    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    const books = await Book.find()
    // console.log(Book)
    //save the session object and sending a response
    req.session.save(() => {
      res.redirect("/users/")
      // res.render("../views/home.ejs")
    })
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const signOutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/auth/sign-in")
    })
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.send("❌ No user with that ID exists!")
      // This can be an EJS page later...
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )
    if (!validPassword) {
      return res.send("❌ Your old password was not correct! Please try again.")
      // This can also be an EJS page...
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("❌ Password and Confirm Password must match")
      // This can also be an EJS page...
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    user.password = hashedPassword
    // It's critical that this field is updated with the password you hashed with bcrypt, and never the plain text password in req.body.password
    await user.save()
    res.send(`✅ Your password has been updated, ${user.username}!`)
    // This can be an EJS page later...
  } catch (error) {
    console.error(
      "⚠️ An error has occurred updating a user's password!",
      error.message
    )
  }
}

module.exports = {
  signInUser,
  registerUser,
  signOutUser,
  updatePassword,
}
