require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
// const morgan = require("morgan")
// const db = require("./db")
// const userDiv = document.querySelectorAll(".userBook")
const path = require("path")
const middleware = require("./middleware")
const PORT = process.env.PORT ? process.env.PORT : 3000

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const db = require("./db")

//require routers
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const bookRouter = require("./routes/bookRouter")
const reviewsRouter = require("./routes/reviewRouter")
// const homeRouter = require("./routes/homeRouter")
const app = express()

let sessionStore = new session.MemoryStore()

if (process.env.MONGODB_URI) {
  try {
    sessionStore = MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  } catch (error) {
    console.log("Falling back to in-memory session storage.")
    console.log(error.message)
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, //to ensure that a session object is saved even if it contains no data
    store: sessionStore,
  })
)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//all use and get will be under here

app.use(middleware.passUserToView)
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/books", bookRouter)
app.use("/reviews", reviewsRouter)
// app.use("/home", homeRouter)

app.listen(PORT, () => {
  console.log(`Express server is listening on port : ${PORT}`)
})
