const mongoose = require("mongoose")

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    item: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],

    shippingAddress: {
        type: String
    },

    orderStatus: {
        type: String,
        enum: ["pending", "cancelled", "ontheway", "deivered"],
        default: "pending"
    },

    paymentDetails: {
        method: { type: String, enum: ["COD", "khalti"] },
        status: { type: String, enum: ["Completed", "Initiated", "Refunded", "Pending"], default: "Pending" },
        pidx: { type: String }
    }

})


const Order = mongoose.model("Order", schema)
module.exports = Order