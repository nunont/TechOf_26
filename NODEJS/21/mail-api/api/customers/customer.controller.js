const CustomerModel = require("./customer.model")
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils')

exports.createCustomer = (req, res) => {
   
    const newCustomer = new CustomerModel(req.body);
    newCustomer.save()
    .then((customer) => {
        res.status(201).json(customer);
    })
    .catch(err => {
        console.log(err)
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
    const pagination = preparePagination(req.query)
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, CustomerModel);

    let fields = '';
    if (req.query.fields){
        fields = req.query.fields.split(',');
    }

    CustomerModel.find(filter)
        .select(fields)
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
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
            res.status(500).json(error);
        })
}

exports.deleteCustomer = (req, res) => {
    /* CustomerModel.findById(req.params.id)
    .then((customer) => {
        if (customer.createdBy != req.currentUser.id
            || req.currentUser.role == "admin"
        ){
            //RESPOSTA ERRO
        }

        return CustomerModel.deleteOne({ _id: customer._id})
    })
    .then((result) => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(500).json(error.errors);
    }) */

    CustomerModel.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}

exports.statisticsCustomers = (req, res) => {
    CustomerModel.aggregate([
        {
            $match: { balance: { $gt : 100}}
        },
        {
            $group: {
                _id: null,
                sum: { $sum: '$balance'},
                count: { $sum: 1 },
                avg: { $avg: '$balance' },
                min: { $min: '$balance' },
                max: { $max: '$balance'}
            }
        }
    ])
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}

exports.statisticsCustomersByCountry = (req, res) => {
    CustomerModel.aggregate([
        {
            $match: { }
        },
        {
            $group: {
                _id: '$country',
                sum: { $sum: '$balance'},
                count: { $sum: 1 },
                avg: { $avg: '$balance' },
                min: { $min: '$balance' },
                max: { $max: '$balance'},
                items: { $push: { balance: '$balance', name: '$name' }}
            }
        }
    ])
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}