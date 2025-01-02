const express = require('express');
const userRouter = express.Router();
const User = require('../Models/userModel');
const Otp = require('../Models/otpModel');
const generateOtp = require('../funcs/generateOtp');
const sendOtp = require('../funcs/sendOtp');

//======= OTP Send ========
userRouter.post('/sendOTP/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const otp = generateOtp();
        await sendOtp(email, otp); // Ensure sendOtp is awaited if it returns a promise
        const newOtp = new Otp({ email, otp });
        await newOtp.save();
        res.send("Otp Sent Successfully...!");
    } catch (err) {
        res.json({ message: err });
    }
});

// ======= Register User =======
userRouter.post('/registerUser', async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = userRouter;

// ======= Sample =======
userRouter.post('/loginUser', async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

// ======= Sample =======
userRouter.post('/addToCart', async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});




// {
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "password": "password123",
//     "cart": [
//         {
//             "foodName": "Pizza",
//             "foodQuantity": 2,
//             "foodPrice": 15.99,
//             "foodImage": ""
//         }
//     ],
//     "history": [
//         {
//             "foodName": "Burger",
//             "foodQuantity": 1,
//             "foodPrice": 9.99,
//             "foodImage": "",
//             "date": ""
//         }
//     ],
// }