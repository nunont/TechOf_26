const express = require('express');
const guestController = require('./guest.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const guestRouter = express.Router();

guestRouter.post('/', authenticate, authorize('guest'), guestController.createGuest);
guestRouter.get('/', guestController.getAllGuests);
guestRouter.get('/me', authenticate, authorize('guest'), guestController.getMyGuestProfile);

guestRouter.get('/:id', guestController.getGuestById);
guestRouter.put('/:id', authenticate, authorize('guest'), guestController.updateGuest);
guestRouter.delete('/:id', authenticate, authorize('guest'), guestController.deleteGuest);

module.exports = guestRouter;
