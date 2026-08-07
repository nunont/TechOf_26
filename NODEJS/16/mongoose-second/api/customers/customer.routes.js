
const express = require('express');
const customerController = require('./customer.controller');
const customerRouter = express.Router();

customerRouter.post('/', customerController.createCustomer);
customerRouter.get('/', customerController.getAllCustomers);
customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.put('/:id', customerController.updateCustomer);
customerRouter.delete('/:id', customerController.deleteCustomer);

module.exports = customerRouter;