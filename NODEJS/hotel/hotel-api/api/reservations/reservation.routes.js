const express = require('express');
const reservationController = require('./reservation.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const reservationRouter = express.Router();

reservationRouter.post('/', authenticate, authorize('guest'), reservationController.createReservation);
reservationRouter.get('/', authenticate, reservationController.getAllReservations);
reservationRouter.get('/me', authenticate, authorize('guest'), reservationController.getMyReservations);
reservationRouter.get('/hotel-me', authenticate, authorize('hotel'), reservationController.getMyHotelReservations);

reservationRouter.get('/:id', authenticate, reservationController.getReservationById);
reservationRouter.put('/:id', authenticate, reservationController.updateReservation);
reservationRouter.delete('/:id', authenticate, reservationController.deleteReservation);

module.exports = reservationRouter;
