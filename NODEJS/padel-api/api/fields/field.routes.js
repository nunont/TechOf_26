const express = require('express');
const fieldController = require('./field.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const fieldRouter = express.Router();

fieldRouter.post('/', authenticate, authorize('club'), fieldController.createField);
fieldRouter.get('/', fieldController.getAllFields);

fieldRouter.get('/:id', fieldController.getFieldById);
fieldRouter.put('/:id', authenticate, authorize('club'), fieldController.updateField);
fieldRouter.delete('/:id', authenticate, authorize('club'), fieldController.deleteField);

module.exports = fieldRouter;
