const HotelModel = require('./hotel.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createHotel = (req, res) => {
    const newHotel = new HotelModel({
        ...req.body,
        user: req.user.id
    });
    newHotel.save()
        .then((hotel) => {
            res.status(201).json(hotel);
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllHotels = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, HotelModel);

    HotelModel.find(filter)
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

exports.getHotelById = (req, res) => {
    HotelModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyHotelProfile = (req, res) => {
    HotelModel.findOne({ user: req.user.id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateHotel = (req, res) => {
    HotelModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteHotel = (req, res) => {
    HotelModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
