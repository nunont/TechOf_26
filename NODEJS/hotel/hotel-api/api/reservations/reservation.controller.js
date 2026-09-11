const ReservationModel = require('./reservation.model');
const GuestModel = require('./../guests/guest.model');
const RoomModel = require('./../rooms/room.model');
const HotelModel = require('./../hotels/hotel.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils');

exports.createReservation = (req, res) => {
    const { room, checkIn, checkOut } = req.body;

    Promise.all([
        GuestModel.findOne({ user: req.user.id }),
        RoomModel.findById(room)
    ])
        .then(([guest, roomDoc]) => {
            if (!guest) {
                return res.status(404).json({ message: 'Não existe nenhum guest associado a este utilizador' });
            }
            if (!roomDoc) {
                return res.status(404).json({ message: 'Quarto não encontrado' });
            }

            return ReservationModel.findOne({
                room,
                status: { $ne: 'cancelled' },
                checkIn: { $lt: checkOut },
                checkOut: { $gt: checkIn }
            })
                .then((overlap) => {
                    if (overlap) {
                        return res.status(409).json({ message: 'Já existe uma reserva para este quarto neste período' });
                    }

                    const newReservation = new ReservationModel({
                        room,
                        checkIn,
                        checkOut,
                        status: req.body.status,
                        guest: guest._id
                    });

                    return newReservation.save()
                        .then((reservation) => {
                            res.status(201).json(reservation);
                        });
                });
        })
        .catch(err => {
            res.status(500).json(err.errors || err);
        });
}

exports.getAllReservations = (req, res) => {
    const pagination = preparePagination(req.query);
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, ReservationModel);

    ReservationModel.find(filter)
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

exports.getReservationById = (req, res) => {
    ReservationModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyReservations = (req, res) => {
    GuestModel.findOne({ user: req.user.id })
        .then((guest) => {
            if (!guest) {
                return res.status(404).json({ message: 'Não existe nenhum guest associado a este utilizador' });
            }
            return ReservationModel.find({ guest: guest._id })
                .then((result) => {
                    res.status(200).json(result);
                });
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.getMyHotelReservations = (req, res) => {
    HotelModel.findOne({ user: req.user.id })
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).json({ message: 'Não existe nenhum hotel associado a este utilizador' });
            }
            return RoomModel.find({ hotel: hotel._id })
        })
        .then((rooms) => {
            const roomIds = rooms.map((room) => room._id);
            return ReservationModel.find({ room: { $in: roomIds } })
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}

exports.updateReservation = (req, res) => {
    ReservationModel.findByIdAndUpdate(req.params.id,
        req.body, { returnDocument: 'after', runValidators: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.deleteReservation = (req, res) => {
    ReservationModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).json(error.errors || error);
        });
}
