const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomModel = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'hotel',
        required: [true, 'O quarto têm que estar associado a um hotel']
    },
    name: {
        type: String,
        required: [true, 'O nome do quarto é obrigatório'],
        trim: true
    },
    type: {
        type: String,
        enum: {
            values: ['single', 'double', 'suite'],
            message: 'O tipo têm que ser single, double ou suite'
        },
        default: 'double'
    },
    pricePerNight: {
        type: Number,
        required: [true, 'O preço por noite é obrigatório'],
        min: [0, 'O preço não pode ser negativo']
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    modifiedAt: Date
});

RoomModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

RoomModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

RoomModel.pre(/^find/, function () {
    this.select('-__v').populate('hotel', 'name city country');
});

module.exports = mongoose.model('room', RoomModel);
