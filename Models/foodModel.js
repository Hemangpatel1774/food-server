const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;