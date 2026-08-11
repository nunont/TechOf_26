const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email ja existe']
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    name: String
});

UserSchema.pre('save', function(){
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
})

module.exports = mongoose.model('user', UserSchema);