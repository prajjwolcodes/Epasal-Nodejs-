const Order = require("../../Model/orderModel")

exports.updateStatus = async (req, res) => {
    const { orderStatus, paymentDetails } = req.body
    const id = req.params.id

    await Order.findByIdAndUpdate(id, {
        orderStatus, paymentDetails
    })

    res.status(200).json({
        message: "Status sucessfully Updated"
    })
}

// exports.viewAllOrders = async (req, res) => {
//     const orders = await Order.find().populate({
//         path: "item.product",
//         select: "productName"
//     })
//     res.status(200).json({
//         order: orders
//     })
// }

// exports.cancelOrder = async (req, res) => {
//     const id = req.params.id
//     if (existingOrder.orderStatus == "pending") {
//         await Order.findByIdAndDelete(id)
//         res.status(400).json({
//             message: "Order Sucessfully Deleted"
//         })
//     }
//     else {
//         res.status(200).json({
//             message: "You cannot update now, The product is already on the way"
//         })
//     }
// }
