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
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location should be longer than 5 characters!'],
        maxLength: [15, 'Location should be shorts than 15 characters!'],
       // match: /^https?:\/\//
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [9, 'Description should be longer than 9 characters!'],
       
    },
    likedList: [{
    }],
 
},
{ timestamps: true});


const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;