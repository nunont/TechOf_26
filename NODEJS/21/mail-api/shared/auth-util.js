const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
    const token = jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRITY}
    );
    return token;
}