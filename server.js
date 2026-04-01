const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

require("dotenv").config({ quiet: true })
const express = require("express")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const morgan = require("morgan")
const db = require("./db")

//require routers
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const bookRouter = require("./routes/bookRouter")
const app = express()

const PORT = 3000
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, //to ensure that a session object is saved even if it contains no data
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
)
//all use and get will be under here
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/books", bookRouter)

app.listen(PORT, () => {
  console.log(`Express server is listening on port : ${PORT}`)
})
