
const User = require('../models/User.js')


const testing = async (req, res) => {
  try {
    res.send("testing is successfully done")
  } catch (error) {
    res.send("Error while testing")
    console.log(error)
  }
}


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const recipes = await Recipe.find({ author: user._id })

    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      picture: user.picture,
      typeOfUser: user.typeOfUser,
      address: user.address,
      recipes: recipes
    }

   res.render('../views/userPage.ejs', { user: data })

  } catch (error) {
    console.error('⚠️ An error has occurred finding a user!', error.message)
  }
}


module.exports = {
  testing,
   getUserById
}
