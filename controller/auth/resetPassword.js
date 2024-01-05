const User = require("../../Model/userModel")
const bcrpyt = require("bcrypt")

exports.resetPassword = async (req,res)=>{
    const {email, password} = req.body
    const userFound = await User.find({userEmail : email})

    if(userFound[0].isotpVerified !== true){
        return res.status(400).json({
            message:"OTP already used"
        })
        
}
    userFound[0].userPassword = bcrpyt.hashSync(password,10)
    userFound[0].isotpVerified = false
    await userFound[0].save()

    res.status(200).json({
        message:"Password Successfully changed"
    })
}