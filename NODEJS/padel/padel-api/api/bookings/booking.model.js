const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingModel = new Schema({
    field: {
        type: Schema.Types.ObjectId,
        ref: 'field',
        required: [true, 'A marcação têm que estar associada a um campo']
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: [true, 'A marcação têm que estar associada a um customer']
    },
    startTime: {
        type: Date,
        required: [true, 'A hora de início é obrigatória']
    },
    endTime: {
        type: Date,
        required: [true, 'A hora de fim é obrigatória']
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

BookingModel.pre('validate', function () {
    if (this.startTime && this.endTime && this.endTime <= this.startTime) {
        this.invalidate('endTime', 'A hora de fim têm que ser depois da hora de início');
    }
});

BookingModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

BookingModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

BookingModel.pre(/^find/, function () {
    this.select('-__v')
        .populate('field', 'name type pricePerHour club')
        .populate('customer', 'name');
});

module.exports = mongoose.model('booking', BookingModel);
