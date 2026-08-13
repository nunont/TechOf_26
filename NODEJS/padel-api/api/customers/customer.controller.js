const CustomerModel = require('./customer.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createCustomer = (req, res) => {
    const newCustomer = new CustomerModel({
        ...req.body,
        user: req.user.id
    });
    newCustomer.save()
        .then((customer) => {
            res.status(201).json(customer);
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllCustomers = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, CustomerModel);

    CustomerModel.find(filter)
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
        .sort(sort)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getCustomerById = (req, res) => {
    CustomerModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyCustomerProfile = (req, res) => {
    CustomerModel.findOne({ user: req.user.id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateCustomer = (req, res) => {
    CustomerModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteCustomer = (req, res) => {
    CustomerModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
