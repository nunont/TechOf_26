const GuestModel = require('./guest.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createGuest = (req, res) => {
    const newGuest = new GuestModel({
        ...req.body,
        user: req.user.id
    });
    newGuest.save()
        .then((guest) => {
            res.status(201).json(guest);
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllGuests = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, GuestModel);

    GuestModel.find(filter)
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

exports.getGuestById = (req, res) => {
    GuestModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyGuestProfile = (req, res) => {
    GuestModel.findOne({ user: req.user.id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateGuest = (req, res) => {
    GuestModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteGuest = (req, res) => {
    GuestModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
