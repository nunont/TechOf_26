const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonModel = new Schema({
    first: {
        type: String,
        required: [true, 'O nome é obrigatorio'],
        trim: true
    },
    family: String,
    city: String,
    country: String, 
    salary: {
        type: Number,
        min: [0, 'O minimo para salario é 0']
    }
});

module.exports = mongoose.model('person', PersonModel);