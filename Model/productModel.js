const mongoose = require("mongoose")
const Review = require("./reviewModel")

const schema = new mongoose.Schema({
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productQty: {
        type: Number,
    },
    productPrice: {
        type: Number,
    },
    productStatus: {
        type: String,
        enum: ["available", "unavailable"]
    },
    productImage: {
        type: String,
    },
    reviews: []
})

const Product = mongoose.model("Product", schema)
module.exports = Product