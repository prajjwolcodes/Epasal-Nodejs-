const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
        default: 3
    },
    message: {
        type: String,
        required: true
    }
})

const Review = mongoose.model("Review", schema)

module.exports = Review