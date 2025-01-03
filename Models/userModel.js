const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    foodName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    foodQuantity: {
        type: Number,
        required: true,
    },
    rating:{
        type: String,
        required: false,
    },
    foodPrice: {
        type: Number,
        required: true
    },
    foodImage: {
        type: String,
        required: false
    }
});
const historySchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    foodQuantity: {
        type: Number,
        required: true,
    },
    foodPrice: {
        type: Number,
        required: true
    },
    foodImage: {
        type: Buffer,
        required: false
    },
    date: {
        type: Number,
        default: Date.now()
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 30
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    cart: {
        type: [cartSchema],
        default: [],
    },
    history: {
        type: [historySchema],
        default: []
    },
    date: {
        type: Number,
        default: Date.now()
    }
});



const User = mongoose.model('User', userSchema);
module.exports = User;