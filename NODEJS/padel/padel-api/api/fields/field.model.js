const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FieldModel = new Schema({
    club: {
        type: Schema.Types.ObjectId,
        ref: 'club',
        required: [true, 'O campo têm que estar associado a um club']
    },
    name: {
        type: String,
        required: [true, 'O nome do campo é obrigatório'],
        trim: true
    },
    type: {
        type: String,
        enum: {
            values: ['indoor', 'outdoor'],
            message: 'O tipo têm que ser indoor ou outdoor'
        },
        default: 'outdoor'
    },
    pricePerHour: {
        type: Number,
        required: [true, 'O preço por hora é obrigatório'],
        min: [0, 'O preço não pode ser negativo']
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    modifiedAt: Date
});

FieldModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

FieldModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

FieldModel.pre(/^find/, function () {
    this.select('-__v').populate('club', 'name city country');
});

module.exports = mongoose.model('field', FieldModel);
