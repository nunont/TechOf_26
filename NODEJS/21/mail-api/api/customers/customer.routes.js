
const express = require('express');
const customerController = require('./customer.controller');
const authMiddleware = require('./../users/auth.middleware')
const customerRouter = express.Router();

customerRouter.post('/', authMiddleware.verifyAuthentication, customerController.createCustomer);
customerRouter.get('/', customerController.getAllCustomers);

customerRouter.get('/statistics', customerController.statisticsCustomers);
customerRouter.get('/statisticsbyCountry', customerController.statisticsCustomersByCountry);


customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.put('/:id', authMiddleware.verifyAuthentication, customerController.updateCustomer);
customerRouter.delete('/:id', 
    authMiddleware.verifyAuthentication, 
    authMiddleware.isAdmin,
    customerController.deleteCustomer);

module.exports = customerRouter;