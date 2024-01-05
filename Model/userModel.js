const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Whats yo name boy?"]
    },
    userEmail: {
        type: String,
        required: [true, "Why no email?"],

    },
    userPassword: {
        type: String,
        required: [true, "Enter your password"],

    },
    userPhone: {
        type: Number,
        required: [true, "What tf is wrong with you?"]
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    otp: {
        type: Number
    },
    isotpVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const User = mongoose.model("User", schema)
module.exports = User