const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'O club têm que estar associado a um utilizador'],
        unique: [true, 'Este utilizador já têm um club associado']
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

ClubModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

ClubModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

ClubModel.pre(/^find/, function () {
    this.select('-__v').populate('user', 'name email role');
});

module.exports = mongoose.model('club', ClubModel);
