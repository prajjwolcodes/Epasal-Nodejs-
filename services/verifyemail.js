const User = require("../Model/userModel");

exports.verifyOtp = async(req,res)=>{
    const {email, otp} = req.body
    if(!otp || !email){
        return res.status(400).json({
            message:"Please Enter your OTP and your email"
        })
    }

    const userFound = await User.find({userEmail:email})
    if(userFound.length == 0){
        return res.json({
            message:"No account registered with that email"
        })
    }
    
    if(userFound[0].otp != otp){
        res.status(400).json({
            message: "Your OTP is incorrect"
        })
    }
    else{
        userFound[0].otp = undefined
        userFound[0].isotpVerified = true
        userFound[0].save()
        res.status(200).json({
            message: "You can reset your password"
        })
    }
}