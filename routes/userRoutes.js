const express = require('express');
const userRouter = express.Router();
const User = require('../Models/userModel');

userRouter.post('/registerUser', async (req, res) => {
    try {
        const data = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            cart: [
                {
                    foodName: "Pizza",
                    foodQuantity: 2,
                    foodPrice: 15.99,
                    foodImage: Buffer.from(""),
                }
            ],
            history: [
                {
                    foodName: "Burger",
                    foodQuantity: 1,
                    foodPrice: 9.99,
                    foodImage: Buffer.from(""),
                    date: new Date()
                }
            ],
            date: new Date()
        };
        const users = await User(data);
        await users.save();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = userRouter;