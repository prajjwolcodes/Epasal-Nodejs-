const dbConnection = require("./Database/dbConnection")

const express = require("express")
const app = express()
const { Server } = require("socket.io")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

app.use(express.static("uploads"))

const authRoutes = require("./routes/auth/authRoutes")
const productRoutes = require("./routes/products/productRoutes")
const adminUserRoutes = require("./routes/adminUser/adminUserRoute")
const userRoutes = require("./routes/user/userRoutes")
const orderRoutes = require("./routes/user/orderRoutes")
const paymentRoutes = require("./routes/user/paymentRoutes")


dbConnection()

app.get("/", (req, res) => {
    res.json({
        message: "Runnningggg"
    })
})

// Authentication Routes
app.use("", authRoutes)
app.use("", productRoutes)
app.use("", adminUserRoutes)
app.use("", userRoutes)
app.use("", orderRoutes)
app.use("", paymentRoutes)

// Port listening
const server = app.listen(process.env.PORT, (req, res) => {
    console.log("Running at port 3000")
})
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("Hello from websocket world");
    socket.on("disconnect", () => {
        console.log("bye bye")
    })
})