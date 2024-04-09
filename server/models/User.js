const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: [10, 'Email should be at least 10 characters'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password too short'],

    },
    createPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'Fish'
    }]
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
 });
 


const User = mongoose.model('User', userSchema);

module.exports = User;