const express = require('express');
const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/forgot', authController.forgotPassword);
authRouter.post('/reset', authController.resetPassword);

module.exports = authRouter;