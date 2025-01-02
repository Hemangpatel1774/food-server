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
        from: `"Foodiest Mart" <${process.env.EMAIL}>`,
        to: userEmail,
        subject: 'Foodiest-Mart Authentication',
        text: `Welcome to Foodiest Mart\n\nYour OTP is ${otp}`,
        html: `<h1>Welcome to Foodiest Mart</h1><br><br>Your OTP is ${otp}`,
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email: %s", error);
    }
};

module.exports = sendOtpNo;
