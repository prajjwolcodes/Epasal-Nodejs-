const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const User = require("../Model/userModel")

exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
        const userExist = await User.findOne({ _id: decoded.id })

        req.user = userExist
        next()

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}