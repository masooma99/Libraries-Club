const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const path = require("path")
const middleware = require("./middleware")
const PORT = process.env.PORT ? process.env.PORT : 3000

const db = require("./db")

<<<<<<< HEAD
<<<<<<< HEAD
=======


>>>>>>> 8010f8d25896eca793f995bebc66408ba57788bb
=======
>>>>>>> 8fd734880ebe24f6f2731ff56d52ed4aec4d621a
//require routers
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const bookRouter = require("./routes/bookRouter")
const reviewsRouter = require("./routes/reviewRouter")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
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
app.use(middleware.passUserToView)
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/books", bookRouter)
app.use("/reviews", reviewsRouter)

app.listen(PORT, () => {
  console.log(`Express server is listening on port : ${PORT}`)
})
