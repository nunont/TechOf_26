const express = require('express');

const toyRouter = express.Router();

const toysController = require('./toys.controller');
const authMiddlewares = require('./../shared/middlewares/authentication.middleware');

toyRouter.get('/', toysController.getAllToys);
toyRouter.post('/', toysController.createToy);
toyRouter.get('/:id', toysController.getToyById)
toyRouter.put('/:id', authMiddlewares.verifyLogin, toysController.updateToy)
toyRouter.delete('/:id', toysController.deleteToy)

module.exports = toyRouter;