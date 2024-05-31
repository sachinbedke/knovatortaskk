const express = require("express")
const mongoose = require("mongoose")
// const cookieParser = require("cookie-parser")
const cors = require("cors")
// const path = require("path")
require("dotenv").config({ path: "./.env" })


mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json())

// app.use(cookieParser())
app.use(express.static("images"))
app.use(cors(
    { origin: "http://localhost:5173" }
))
// app.use("/api/v1/auth", require("./router/authRoute"))
app.use("/api", require("./router"))

app.use("*", (req, res) => {

    res.status(404).json({ message: "Resource not found" })
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connection.once("open", () => {
    console.log("MONGOOSE IS CONNECTED")
    app.listen(process.env.PORT, console.log(` SERVER RUNINNG http://localhost:/${process.env.PORT}`))
})