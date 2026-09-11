const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'O hotel têm que estar associado a um utilizador'],
        unique: [true, 'Este utilizador já têm um hotel associado']
    },
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        minLength: [3, 'O nome têm que conter pelo menos 3 letras'],
        maxLength: [40, 'O nome não pode conter mais de 40 letras'],
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    createdAt: Date,
    modifiedAt: Date
});

HotelModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

HotelModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

HotelModel.pre(/^find/, function () {
    this.select('-__v').populate('user', 'name email role');
});

module.exports = mongoose.model('hotel', HotelModel);
