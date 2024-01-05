const User = require("../../Model/userModel")

exports.getAllUser = async (req, res) => {
    const adminId = req.user.id
    const users = await User.find({ _id: { $ne: adminId } }).select("+userEmail").populate({
        path: "cart",
        select: "productName"
    })
    res.status(200).json({
        data: users
    })
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id
    const userExist = await User.findById(userId)
    if (!userExist) {
        return res.status(400).json({
            message: "No User with that id"
        })
    }

    await User.findByIdAndDelete(userId)

    res.status(200).json({
        message: "User Successfully Deleted"
    })
}

