const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'O customer têm que estar associado a um utilizador'],
        unique: [true, 'Este utilizador já têm um customer associado']
    },
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        minLength: [3, 'O nome têm que conter pelo menos 3 letras'],
        maxLength: [40, 'O nome não pode conter mais de 40 letras'],
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    dateOfBirth: Date,
    createdAt: Date,
    modifiedAt: Date
});

CustomerModel.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

CustomerModel.pre('findOneAndUpdate', function () {
    this.set({ modifiedAt: new Date() });
});

CustomerModel.pre(/^find/, function () {
    this.select('-__v').populate('user', 'name email role');
});

module.exports = mongoose.model('customer', CustomerModel);
