const nodemailer = require("nodemailer")

async function sendEmail(options){
    var transporter = nodemailer.createTransport({
        service : "gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })


const mailOptions = {
    from:"Prazzwol Shrestha <shresthaPrajjwol4@gmail.com",
    to:options.email,
    subject:options.subject,
    text:options.text
}

await transporter.sendMail(mailOptions)
};

module.exports = sendEmail
