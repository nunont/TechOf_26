const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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
    name: String,
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    resetToken: String,
    resetExpire: Date
});

UserSchema.methods = {
    comparePassword: function(plainTextPassword){
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    createNewPasswordToken: function(){
        const salt = bcrypt.genSaltSync(12);

        this.resetToken = bcrypt.hashSync("TOKEN", salt);
        this.resetExpire = Date.now() + parseInt(process.env.PASSWORD_RESET_EXPIRITY); 
    }
}

UserSchema.pre('save', function(){
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
})

module.exports = mongoose.model('user', UserSchema);