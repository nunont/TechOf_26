const UserModel = require('./user.model');
const authUtil = require('./../../shared/auth-util');
const emailService = require('./../../shared/email.service');

exports.register = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
    .then(async (user) => {
        await emailService.sendEmail(
            user.email,
            "Bem vindo ao Padel Cenas!",
            `
                <h1>Bem Vindo</h1>
                <h3>${user.name}</h3>
                <p>A partir de agora podes utilizar o brilhante sistema de padel que ainda nao faz nada</p>
            `
        );
        res.status(201).json({
            token: authUtil.generateToken(user)
        })
    })
    .catch((err) => {
        res.status(500).json(err.message);
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

exports.forgotPassword = (req, res) => {

    UserModel.findOne({ email: req.body.email })
    .then(async (user) => {
        if (!user){
            res.status(400).json("Nao e possivel realizar o pedido");
        }

        user.createNewPasswordToken();
        user.save();

        await emailService.sendEmail(user.email, "Reset Password", user.resetToken);
        res.status(200).json();
    })
    .catch((err) => res.status(500).json(err.message))
}

exports.resetPassword = (req, res) => {
    UserModel.findOne({
        resetToken: req.body.token
    })
    .then((user) => {
        if (!user){
            res.status(400).json('Nao foi possivel realizer o pedido');
            return;
        }
        if (user.resetExpire > Date.now() + 60 * 60 * 1000){
            res.status(400).json("O token já expirou");
            return;
        }

        user.password = req.body.password;
        user.resetToken = null;
        user.resetExpire = null;
        user.save();
        res.status(200).json();
    })
    .catch((err) => res.status(500).json(err.message))
}