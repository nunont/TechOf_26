const express = require('express');
const hotelController = require('./hotel.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const hotelRouter = express.Router();

hotelRouter.post('/', authenticate, authorize('hotel'), hotelController.createHotel);
hotelRouter.get('/', hotelController.getAllHotels);
hotelRouter.get('/me', authenticate, authorize('hotel'), hotelController.getMyHotelProfile);

hotelRouter.get('/:id', hotelController.getHotelById);
hotelRouter.put('/:id', authenticate, authorize('hotel'), hotelController.updateHotel);
hotelRouter.delete('/:id', authenticate, authorize('hotel'), hotelController.deleteHotel);

module.exports = hotelRouter;
