const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendOtpNo = async (userEmail, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAILPASS,
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Foodiest-Mart Authentication',
        text: 'Welcome to Foodiest Mart\n\nYour OTP is ' + otp,
        headers: {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High',
            'Importance': 'High'
        },
        html: '<h1>Welcome to Foodiest Mart</h1><br><br>Your OTP is ' + otp,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
};

module.exports = sendOtpNo;
