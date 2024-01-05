const Product = require("../../Model/productModel")
const Review = require("../../Model/reviewModel")

exports.createReview = async (req, res) => {
    const userId = req.user.id
    const { rating, message } = req.body
    const productId = req.params.id

    if (!rating || !message) {
        return res.status(400).json({
            message: "Provide Rating and Message"
        })
    }


    const reviews = await Review.create({
        userId, productId, rating, message
    })
    res.status(200).json({
        message: "Thank you for reviewing",
        reviews: reviews
    })

    const product = await Product.findById(productId)
    product.reviews = reviews
    await product.save()
}


exports.getReview = async (req, res) => {
    const reviews = await Review.find().populate({
        path: "productId",
        select: "productName"
    })
    if (!reviews) {
        return res.status(400).json({
            message: "No review available for that"
        })
    }
    res.status(200).json({
        reviews: reviews
    })
}

exports.getSingleReview = async (req, res) => {
    const productId = req.params.id
    const review = await Review.find({ productId: productId }).populate("productId")
    if (!review) {
        return res.status(400).json({
            message: "No review available with that id"
        })
    }
    res.status(200).json({
        reviews: review
    })
}


exports.deleteReview = async (req, res) => {
    const id = req.params.id
    await Review.findByIdAndDelete(id)
    res.status(200).json({
        message: "Review Deleted",
    })
}

exports.getMyReview = async (req, res) => {
    const id = req.params.id
    const myReviews = await Review.find({ userId: id }).populate({
        path: "userId",
        select: "userName , userEmail"
    })
    if (myReviews.length == 0) {
        return res.status(400).json({
            message: "You have not made any reviews"
        })
    }
    res.status(200).json({
        yourReviews: myReviews
    })
}