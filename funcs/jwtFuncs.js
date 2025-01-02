const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
};

const jwtVerify = (token) => {
    return jwt.decode(token, process.env.JWT_SECRET);
}


module.exports = { jwtSign, jwtVerify };