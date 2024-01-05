const jwt = require("jsonwebtoken")
const bcrpyt = require("bcrypt")
const User = require("../../Model/userModel")

// Register API Controller

exports.registerUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body
    if (!email || !name || !password || !phone)
        return res.status(400).json({
            message: "Provide all the data"
        })

    const userFound = await User.find({ userEmail: email })
    if (userFound.length)
        return res.status(400).json({
            message: "User with that email is already Registered"
        })

    console.log(userFound)
    await User.create({
        userName: name,
        userEmail: email,
        userPassword: bcrpyt.hashSync(password, 10),
        userPhone: phone,
        role: role
    })

    res.status(201).json({
        message: "You are registered"
    })
}

// Login API Controller

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            message: "Provide all the data"
        })

    const userFound = await User.find({ userEmail: email })

    if (userFound.length == 0) {
        return res.status(400).json({
            message: "Not registered with that email"
        })
    }

    const passwordMatch = bcrpyt.compareSync(password, userFound[0].userPassword)
    if (passwordMatch) {
        const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
            expiresIn: "30d"
        })
        res.status(200).json({
            message: "You are successfully Logged in",
            token: token
        })
    }
    else {
        res.status(400).json({
            message: "Invalid password"
        })
    }
}