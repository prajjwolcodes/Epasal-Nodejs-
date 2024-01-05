const otpGenerator = require("otp-generator")

function generateOtp(){ 

    const otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false, 
    lowerCaseAlphabets:false,
    specialChars: false 
});
return otp
}

module.exports = generateOtp

