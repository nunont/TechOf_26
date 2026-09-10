const express = require('express');
const bookingController = require('./booking.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const bookingRouter = express.Router();

bookingRouter.post('/', authenticate, authorize('customer'), bookingController.createBooking);
bookingRouter.get('/', authenticate, bookingController.getAllBookings);
bookingRouter.get('/me', authenticate, authorize('customer'), bookingController.getMyBookings);

bookingRouter.get('/:id', authenticate, bookingController.getBookingById);
bookingRouter.put('/:id', authenticate, bookingController.updateBooking);
bookingRouter.delete('/:id', authenticate, bookingController.deleteBooking);

module.exports = bookingRouter;
