const express = require('express');
const customerController = require('./customer.controller');
const { authenticate, authorize } = require('./../../shared/auth-middleware');

const customerRouter = express.Router();

customerRouter.post('/', authenticate, authorize('customer'), customerController.createCustomer);
customerRouter.get('/', customerController.getAllCustomers);
customerRouter.get('/me', authenticate, authorize('customer'), customerController.getMyCustomerProfile);

customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.put('/:id', authenticate, authorize('customer'), customerController.updateCustomer);
customerRouter.delete('/:id', authenticate, authorize('customer'), customerController.deleteCustomer);

module.exports = customerRouter;
