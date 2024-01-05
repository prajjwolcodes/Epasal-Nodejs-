const { initiatePayment, verifypidx } = require("../../controller/user/paymentController")
const { isAuthenticated } = require("../../middleware/isAuthenticated")
const tryCatch = require("../../services/tryCatch")

const router = require("express").Router()

router.route("/payment").post(isAuthenticated, tryCatch(initiatePayment))
router.route("/success").get(verifypidx)

module.exports = router
