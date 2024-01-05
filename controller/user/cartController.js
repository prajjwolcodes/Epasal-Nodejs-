const Product = require("../../Model/productModel")
const User = require("../../Model/userModel")

exports.addToCart = async (req, res) => {
    const userId = req.user.id
    const productId = req.params.id

    const productExist = await Product.findById(productId)
    if (!productExist) {
        return res.status(400).json({
            message: "No product found with that id"
        })
    }

    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save()

    res.status(200).json({
        message: "Succesfully added to cart"
    })
}

exports.showCartItems = async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).populate({
        path: "cart",
        select: "-productStatus -__v"
    })
    const items = user.cart

    res.status(200).json({
        cartItems: items
    })
}

exports.deleteCartItems = async (req, res) => {
    const productId = req.params.id
    const userId = req.user.id

    const user = await User.findById(userId)
    user.cart = user.cart.filter((item) => {
        return item != productId
    })
    await user.save()

    res.status(200).json({
        message: "Product Sucessfully deleted "
    })
}