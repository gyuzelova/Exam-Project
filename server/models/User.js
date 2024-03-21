const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password too short'],
        
    },
});



userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Password missmatch!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;