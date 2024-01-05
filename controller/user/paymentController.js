const { default: axios } = require("axios")
const Order = require("../../Model/orderModel")

exports.initiatePayment = async (req, res) => {
    const { orderId, amount } = req.body
    if (!orderId || !amount) {
        return res.status(400).json({
            message: "Provide orderId and amount"
        })
    }
    const data = {
        return_url: "http://localhost:3000/success",
        website_url: "http://localhost:3000",
        amount,
        purchase_order_id: orderId,
        purchase_order_name: "test"
    }

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", data, {
        headers: {
            "Authorization": "key 5fd1e7e1a4964d49820227266e71f14e"
        }
    })
    await Order.findByIdAndUpdate(orderId, {
        "paymentDetails.pidx": response.data.pidx
    })

    // res.redirect(response.data.payment_url)
    res.status(400).json({
        data: response.data
    })
}

exports.verifypidx = async (req, res) => {
    const pidx = req.query.pidx
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", { pidx: pidx }, {
        headers: {
            "Authorization": "key 5fd1e7e1a4964d49820227266e71f14e"
        }
    })

    const order = await Order.findOne({ "paymentDetails.pidx": pidx })

    if (response.data.status = "Completed") {
        order.paymentDetails.method = "khalti"
        order.paymentDetails.status = "Completed"
        order.save()
    }
    res.send(response.data);
}