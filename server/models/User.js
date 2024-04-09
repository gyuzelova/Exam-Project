const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        minLength: [9, 'Email should be at least 9 characters'],
    },
    gender:{type: String,
    required: [true, 'Gender is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password too short'],
        
    },
    createPost: [{
        type: mongoose.Types.ObjectId,
        ref:'Fish'
    }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;