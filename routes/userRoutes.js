const express = require('express');
const userRouter = express.Router();
const User = require('../Models/userModel');
const Otp = require('../Models/otpModel');
const generateOtp = require('../funcs/generateOtp');
const sendOtp = require('../funcs/sendOtp');
const jwt = require('jsonwebtoken');
const { jwtSign, jwtVerify } = require('../funcs/jwtSign');


// Authenticate JWT
userRouter.post('/authToken', (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwtVerify(token);
        res.send({ auth: true, email : decoded.email });
    } catch (err) {
        res.send({ auth: false, message: 'Invalid token' });
    }
});
//======= OTP Send ========
userRouter.post('/sendOTP/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const otp = generateOtp();
        // Ensure sendOtp is awaited if it returns a promise
        await sendOtp(email, otp);
        const newOtp = new Otp({ email, otp });
        await newOtp.save();
        res.send({message:"ok"});
    } catch (err) {
        res.json({ message: err });
    }
});
// ======= Verify OTP =======
userRouter.post('/verifyOTP/:email/:otp', async (req, res) => {
    try {
        const email = req.params.email;
        const otp = req.params.otp;
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord) {
            return res.send("Invalid OTP");
        }
        // Optionally, you can delete the OTP record after verification
        await Otp.deleteOne({ email, otp });

        res.send({message:"ok"});
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
        const userToken = jwtSign({ email : req.body.email, password : req.body.password });
        res.send({message:"ok",userToken,email:data.email});
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = userRouter;

// ======= Login User =======
userRouter.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.send({message:"Invalid email or password"});
        }
        const userToken = jwtSign({ email, password });
        res.send({message:"ok",userToken ,email});
    } catch (err) {
        res.send({message : err.message});
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
// // Generate JWT
// userRouter.post('/generateToken', (req, res) => {
//     const payload = { email: req.body.email ,password : req.body.password};
//     const token = jwtSign(payload);
//     res.send(token);
// });

// // Decode JWT
// userRouter.post('/decodeToken', (req, res) => {
//     const token = req.body.token;
//     try {
//         const decoded = jwtVerify(token);
//         res.send(decoded);
//     } catch (err) {
//         res.send({ message: 'Invalid token' });
//     }
// });