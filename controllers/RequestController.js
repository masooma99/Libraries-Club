const User = require("../models/User.js")
const Request = require("../models/UserTypeRequests.js")
// const Admin = require("../models/Admin")

const createRequest = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body)
    console.log("entered the create request function")
  } catch (error) {
    console.log(`error occur when creating the request: ${error}`)
  }
}

module.exports = {
  createRequest,
}
