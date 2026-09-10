const BookingModel = require('./booking.model');
const CustomerModel = require('./../customers/customer.model');
const FieldModel = require('./../fields/field.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createBooking = (req, res) => {
    const { field, startTime, endTime } = req.body;

    Promise.all([
        CustomerModel.findOne({ user: req.user.id }),
        FieldModel.findById(field)
    ])
        .then(([customer, fieldDoc]) => {
            if (!customer) {
                return res.status(404).json({ message: 'Não existe nenhum customer associado a este utilizador' });
            }
            if (!fieldDoc) {
                return res.status(404).json({ message: 'Campo não encontrado' });
            }

            return BookingModel.findOne({
                field,
                status: { $ne: 'cancelled' },
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            })
                .then((overlap) => {
                    if (overlap) {
                        return res.status(409).json({ message: 'Já existe uma marcação para este campo neste horário' });
                    }

                    const newBooking = new BookingModel({
                        field,
                        startTime,
                        endTime,
                        status: req.body.status,
                        customer: customer._id
                    });

                    return newBooking.save()
                        .then((booking) => {
                            res.status(201).json(booking);
                        });
                });
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllBookings = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, BookingModel);

    BookingModel.find(filter)
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

exports.getBookingById = (req, res) => {
    BookingModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyBookings = (req, res) => {
    CustomerModel.findOne({ user: req.user.id })
        .then((customer) => {
            if (!customer) {
                return res.status(404).json({ message: 'Não existe nenhum customer associado a este utilizador' });
            }
            return BookingModel.find({ customer: customer._id })
                .then((result) => {
                    res.status(200).json(result);
                });
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateBooking = (req, res) => {
    BookingModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteBooking = (req, res) => {
    BookingModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
