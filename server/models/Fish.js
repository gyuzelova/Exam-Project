const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength:[2, 'Name should be longer than 2 characters!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [3, 'Type should be longer than 3 characters!'],
        maxLength: [20, 'Type should be shorts than 20 characters!'],
       // match: /^https?:\/\//
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [9, 'Description should be longer than 9 characters!'],
       
    },
    likedList: [{
    }],
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
 
},
{ timestamps: true});


const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;