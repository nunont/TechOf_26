const UserModel = require('./user.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('./../../shared/config');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

exports.register = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
        .then((user) => {
            res.status(201).json({
                token: generateToken(user)
            });
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e password são obrigatórios' });
    }

    UserModel.findOne({ email })
        .select('+password')
        .then((user) => {
            if (!user || !user.comparePassword(password)) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            res.status(200).json({
                token: generateToken(user)
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.me = (req, res) => {
    UserModel.findById(req.user.id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}
