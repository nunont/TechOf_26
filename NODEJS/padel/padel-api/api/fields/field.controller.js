const FieldModel = require('./field.model');
const ClubModel = require('./../clubs/club.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createField = (req, res) => {
    ClubModel.findOne({ user: req.user.id })
        .then((club) => {
            if (!club) {
                return res.status(404).json({ message: 'Não existe nenhum club associado a este utilizador' });
            }

            const newField = new FieldModel({
                ...req.body,
                club: club._id
            });

            return newField.save()
                .then((field) => {
                    res.status(201).json(field);
                });
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllFields = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, FieldModel);

    FieldModel.find(filter)
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

exports.getFieldById = (req, res) => {
    FieldModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateField = (req, res) => {
    FieldModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteField = (req, res) => {
    FieldModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
