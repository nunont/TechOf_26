const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: [true, 'Já existe um utilizador com o mesmo email'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'A password é obrigatória'],
        minLength: [4, 'A password têm que conter pelo menos 4 caracteres'],
        select: false
    },
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: ['customer', 'club'],
            message: 'O role têm que ser customer ou club'
        },
        required: [true, 'O role é obrigatório']
    },
    createdAt: Date
});

UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(12);
        this.password = bcrypt.hashSync(this.password, salt);
    }
});

UserSchema.pre('save', function () {
    if (this.isNew) {
        this.createdAt = new Date();
    }
});

UserSchema.pre(/^find/, function () {
    this.select('-__v');
});

UserSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compareSync(candidate, this.password);
}

module.exports = mongoose.model('user', UserSchema);
