const PersonModel = require('./person.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils')

exports.createPerson = (req, res) => {
    const newPerson = new PersonModel(req.body);
    newPerson.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}

exports.getAllPersons = (req, res) => {
    const pagination = preparePagination(req.query)
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, PersonModel);
    
    PersonModel.find(filter)
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
        .sort(sort)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}