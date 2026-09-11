const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReservationModel = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room',
        required: [true, 'A reserva têm que estar associada a um quarto']
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'guest',
        required: [true, 'A reserva têm que estar associada a um guest']
    },
    checkIn: {
        type: Date,
        required: [true, 'A data de check-in é obrigatória']
    },
    checkOut: {
        type: Date,
        required: [true, 'A data de check-out é obrigatória']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'confirmed', 'cancelled'],
            message: 'O status têm que ser pending, confirmed ou cancelled'
        },
        default: 'confirmed'
    },
    createdAt: Date,
    modifiedAt: Date
});

ReservationModel.pre('validate', function () {
    if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
        this.invalidate('checkOut', 'A data de check-out têm que ser depois da data de check-in');
    }
});

ReservationModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

ReservationModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

ReservationModel.pre(/^find/, function () {
    this.select('-__v')
        .populate('room', 'name type pricePerNight hotel')
        .populate('guest', 'name');
});

module.exports = mongoose.model('reservation', ReservationModel);
