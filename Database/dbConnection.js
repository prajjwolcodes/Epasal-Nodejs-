const mongoose = require("mongoose")
const User = require("../Model/userModel")

async function dbConnection() {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.2z0efp7.mongodb.net/?retryWrites=true&w=majority")
    console.log("Database Connected")
}

module.exports = dbConnection