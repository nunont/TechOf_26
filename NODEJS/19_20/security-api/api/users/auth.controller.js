const UserModel = require('./user.model');
const authUtil = require('./../../shared/auth-util')

exports.register = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
    .then((user) => {
        res.status(201).json({
            token: authUtil.generateToken(user)
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        res.status(400).json("Obrigatorio Preencher password");
        return;
    }

    UserModel.findOne({ email: email})
    .then((user) => {
        if (!user){
            res.status(400).json("Não foi possivel realizar o login.");
            return;
        }

        if (!user.comparePassword(password)){
            res.status(400).json("Password Errada");
            return;
        }

        res.status(200).json({
            token: authUtil.generateToken(user)
        })
    })
}
