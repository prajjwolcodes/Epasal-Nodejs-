const { addToCart, showCartItems, deleteCartItems } = require("../../controller/user/cartController")
const { getMyReview } = require("../../controller/user/userController")
const { createReview, getReview, getSingleReview, deleteReview } = require("../../controller/user/userController")
const { isAuthenticated } = require("../../middleware/isAuthenticated")
const tryCatch = require("../../services/tryCatch")

const router = require("express").Router()


//Review Routes
router.route("/review").get(getReview)
router.route("/review/:id")
    .get(tryCatch(getSingleReview))
    .delete(isAuthenticated, deleteReview)
    .post(isAuthenticated, createReview)

router.route("/myreview/:id").get(isAuthenticated, tryCatch(getMyReview))

//Cart Routes
router.route("/cart/:id").post(isAuthenticated, addToCart).delete(isAuthenticated, deleteCartItems)
router.route("/cart").get(isAuthenticated, showCartItems)

module.exports = router