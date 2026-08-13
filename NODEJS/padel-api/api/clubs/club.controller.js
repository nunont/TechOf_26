const ClubModel = require('./club.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createClub = (req, res) => {
    const newClub = new ClubModel({
        ...req.body,
        user: req.user.id
    });
    newClub.save()
        .then((club) => {
            res.status(201).json(club);
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllClubs = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, ClubModel);

    ClubModel.find(filter)
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

exports.getClubById = (req, res) => {
    ClubModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyClubProfile = (req, res) => {
    ClubModel.findOne({ user: req.user.id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateClub = (req, res) => {
    ClubModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteClub = (req, res) => {
    ClubModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
