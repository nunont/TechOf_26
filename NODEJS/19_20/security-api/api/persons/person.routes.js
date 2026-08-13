const express = require('express');
const PersonController = require('./person.controller');

const PersonRouter = express.Router();

PersonRouter.post('/', PersonController.createPerson)

module.exports = PersonRouter;