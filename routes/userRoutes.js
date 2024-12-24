const express = require('express');
const userRouter = express.Router();
const User = require('../Models/userModel');

userRouter.post('/registerUser', async (req, res) => {
    try {
        const data = req.body;
        const users = await User(data);
        await users.save();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = userRouter;









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