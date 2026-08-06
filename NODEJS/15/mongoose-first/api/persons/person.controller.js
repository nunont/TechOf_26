const PersonModel = require('./person.model');

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