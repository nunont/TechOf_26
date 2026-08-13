require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('./user.model');

exports.verifyAuthentication = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || token.split(' ').length < 2){
        res.status(401).json("Nao Autorizado");
        return;
    }
    token = token.split(' ')[1];

    let decoded = {};
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        if (err.name == 'TokenExpiredError'){
            res.status(403).json("Token is Expired");
        }
        else {
            res.status(400).json("Token Invalido");
        }
        return;
    }

    UserModel.findById(decoded.id)
    .then((user) => {
        if (!user){
            res.status(400).json("User Not found");
        }

        req.currentUser = user;
        next();
    })
    .catch(error => {
        res.status(500).json(error);
        return;
    })
}

exports.isAdmin = (req, res, next) => {
    if (req.currentUser && 
        req.currentUser.role == 'admin'
    ){
        next();
    }
    else {
        res.status(401).json("Nao Autorizado");
        return;
    }
}