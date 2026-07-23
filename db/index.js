const mongoose = require("mongoose")

const uri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/libraries-club"

const connect = async () => {
  try {
    const dns = require("dns")
    dns.setServers(["8.8.8.8", "1.1.1.1"])

    mongoose.connection.on("connected", () => {
      console.log("🍃 Successfully connected to MongoDB database . . .")
    })

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error . . .")
      console.log(error.message)
    })

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log("🍃 Successfully connected to MongoDB database . . .")
  } catch (error) {
    console.log("Error connecting to MongoDB . . .")
    console.log(error.message)
  }
}

connect()

module.exports = mongoose
