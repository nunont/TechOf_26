const express = require('express');
const roomController = require('./room.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const roomRouter = express.Router();

roomRouter.post('/', authenticate, authorize('hotel'), roomController.createRoom);
roomRouter.get('/', roomController.getAllRooms);

roomRouter.get('/:id', roomController.getRoomById);
roomRouter.put('/:id', authenticate, authorize('hotel'), roomController.updateRoom);
roomRouter.delete('/:id', authenticate, authorize('hotel'), roomController.deleteRoom);

module.exports = roomRouter;
