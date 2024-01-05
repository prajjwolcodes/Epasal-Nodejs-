const { registerUser, loginUser } = require("../../controller/auth/authController")
const { forgotPassword } = require("../../controller/auth/forgotpassword")
const { resetPassword } = require("../../controller/auth/resetPassword")
const { verifyOtp } = require("../../services/verifyemail")

const router = require("express").Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotPassword)
router.route("/verifyotp").post(verifyOtp)
router.route("/resetpassword").post(resetPassword)


module.exports = router