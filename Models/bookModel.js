const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BookModel = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    author: {
        type: String,
    },
    read: {
        type: Boolean,
        default: true
    },
});

//Export the model
module.exports = mongoose.model('Book', BookModel);