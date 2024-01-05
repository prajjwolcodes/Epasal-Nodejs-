const User = require("../../Model/userModel")
const sendEmail = require("../../services/sendEmail")
const generateOtp = require("./otpGenerator")

exports.forgotPassword = async (req, res) => {
    const { email } = req.body
    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(400).json({
            message: "No account registered with that email"
        })
    }

    const otp = generateOtp()
    userFound[0].otp = otp
    await userFound[0].save()

    await sendEmail({
        email: email,
        subject: "Change your password using this OTP",
        text: "Use this one time password to reset your password " + otp
    })

    res.status(200).json({
        message: "OTP succesfully sent"
    })
}