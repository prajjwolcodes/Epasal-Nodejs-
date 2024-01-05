const Order = require("../../Model/orderModel")

exports.createOrder = async (req, res) => {
    const userId = req.user.userId
    const { shippingAddress, paymentDetails, item } = req.body
    if (!shippingAddress || !paymentDetails || !item.length) {
        return res.status(400).json({
            message: "Please provide all the information"
        })
    }

    await Order.create({
        user: userId,
        shippingAddress,
        paymentDetails,
        item
    })

    res.status(200).json({
        message: "Order Succesfully created"
    })
}

exports.viewOrders = async (req, res) => {
    const id = req.params.id
    const orders = await Order.findById(id).populate({
        path: "item.product",
        select: "productName"
    })
    res.status(200).json({
        order: orders
    })
}

exports.updateOrder = async (req, res) => {
    const id = req.params.id
    const existingOrder = await Order.findById(id)
    if (!existingOrder) {
        return res.status(400).json({
            message: "No order with that id"
        })
    }
    const { shippingAddress, paymentDetails, item } = req.body

    if (existingOrder.orderStatus == "pending") {
        await Order.findByIdAndUpdate(id, {
            shippingAddress, paymentDetails, item
        })

        res.status(200).json({
            message: "Sucessfully Updated"
        })
    }
    else {
        res.status(200).json({
            message: "You cannot update now, The product is already on the way"
        })
    }

}


exports.cancelOrder = async (req, res) => {
    const id = req.params.id
    const existingOrder = await Order.findById(id)
    if (!existingOrder) {
        return res.status(400).json({
            message: "No order with that id"
        })
    }
    if (existingOrder.orderStatus == "pending") {
        await Order.findByIdAndDelete(id)
        res.status(400).json({
            message: "Order Sucessfully Deleted"
        })
    }
    else {
        res.status(200).json({
            message: "You cannot update now, The product is already on the way"
        })
    }
}