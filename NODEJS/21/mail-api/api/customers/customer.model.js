const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    email: {
        type: String,
        required: [true, 'O email é obrigatorio para o cliente'],
        unique: [ true, 'Já existe um cliente com o mesmo email'],
        trim: true
    },
    name: {
        type: String,
        required: [ true, 'O nome é obrigatório'],
        minLength: [ 3, 'O nome têm que conter pelo menos 3 letras'],
        maxLength: [ 20, 'O nome não pode conter mais de 20 letras'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        min: '1920-01-01',
        max: '2008-01-01'
    },
    balance: Number,
    createdAt: Date,
    modifiedAt: Date,
    active: {
        type: Boolean,
        default: true
    }
});

CustomerModel.pre('save', function(){
    this.createdAt = new Date();
});

CustomerModel.pre('findOneAndUpdate', function(){
    this.set({ modifiedAt: new Date() });
})

CustomerModel.pre("findByIdAndDelete", async function(next) {
    console.log("cemas")
    this.op = "updateOne";
    this.setUpdate({$set: {active: false}})
    next();
});

CustomerModel.pre(/^find/, function(){
    this.find({ active: true }).select('-__v');
})


module.exports = mongoose.model('customer', CustomerModel);
