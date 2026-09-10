const express = require('express');
const clubController = require('./club.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const clubRouter = express.Router();

clubRouter.post('/', authenticate, authorize('club'), clubController.createClub);
clubRouter.get('/', clubController.getAllClubs);
clubRouter.get('/me', authenticate, authorize('club'), clubController.getMyClubProfile);

clubRouter.get('/:id', clubController.getClubById);
clubRouter.put('/:id', authenticate, authorize('club'), clubController.updateClub);
clubRouter.delete('/:id', authenticate, authorize('club'), clubController.deleteClub);

module.exports = clubRouter;
