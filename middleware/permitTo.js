exports.permitTo = async (req, res, next) => {
    const isUserAdmin = req.user

    if (!isUserAdmin) {
        return res.status(400).json({
            message: "No Product with that id"
        })
    }

    if (isUserAdmin.role != "admin") {
        res.status(200).json({
            message: "You must be admin to perform this action"
        })
    }
    else {
        next()
    }


}