const CustomerModel = require("./customer.model")

exports.createCustomer = (req, res) => {
    const newCustomer = new CustomerModel(req.body);
    newCustomer.save()
    .then((customer) => {
        res.status(201).json(customer);
    })
    .catch(err => {
        res.status(500).json(err.errors);
    });
}

/* exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = await CustomerModel.create(req.body);
        res.status(200).json(newCustomer);
    } catch (error) {
        res.status(500).json(error.errors)
    }
} */

exports.getAllCustomers = (req, res) => {
    CustomerModel.find({})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}

exports.getCustomerById = (req, res) => {
    CustomerModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}

exports.updateCustomer = (req, res) => {
    CustomerModel.findByIdAndUpdate(req.params.id, 
        req.body, {returnDocument: 'after', runValidators: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}

exports.deleteCustomer = (req, res) => {
    CustomerModel.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}