const UserModel = require('./user.model');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
    .then((user) => {
        const token = jwt.sign(
            { id: user._id, email: user.email},
            "Y9kZzHjbb3R3wWjQWKjpXG",
            { expiresIn: 2 * 60 * 1000}
        );
        res.status(201).json({
            token: token
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
}
