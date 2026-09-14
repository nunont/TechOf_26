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
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
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
    if (this.getFilter().isDeleted === undefined) {
        this.where({ isDeleted: false });
    }

    this.select('-__v -isDeleted -deletedAt')
        .populate('field', 'name type pricePerHour club')
        .populate('customer', 'name');
});

BookingModel.pre(['deleteOne', 'deleteMany', 'findOneAndDelete'], function () {
    throw new Error('Use softDelete() — hard delete is disabled para bookings');
});

BookingModel.methods.softDelete = function () {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
};

/* Menos aconselhada - Devido às actualizações na biblioteca(monggose)

BookingModel.pre('findOneAndDelete', async function () {
    const filter = this.getFilter();
    await this.model.updateOne(filter, { isDeleted: true, deletedAt: new Date() });
    this.setQuery({ _id: null }); // delete now matches nothing
});
 */
module.exports = mongoose.model('booking', BookingModel);
