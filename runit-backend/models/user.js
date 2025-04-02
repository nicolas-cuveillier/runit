const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    lastname: {
        type: String,
        default: "Doe",
        maxlength: 50,
        minlength: 0,
        required: true
    },
    firstname: {
        type: String,
        default: "John",
        maxlength: 50,
        minlength: 0,
        required: true
    },
    password: {
        type: String,
        minlength: 1,
        required: true
    },
    mail: {
        type: String,
        default: "john.doe@example.com",
        maxlength: 100,
        required: true
    },
    phone: {
        type: String,
        default: "0000000000",
        maxlength: 50
    },
    location: {
        type: String,
        default: "no where",
        maxlength: 100
    },
    profil_picture: {
        type: String,
        default: "./images/default_profil_picture.jpg"
    },
    profil_picture_url: {
        url: {
            type: String,
            default: "./images/default_profil_picture.jpg"
        },
        valid_until: {
            type: Date,
        }
    },
    description: {
        type: String,
        default: "lorem ipsum",
        maxlength: 400,
        minlength: 0
    },
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
    runs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Run' }]
});

module.exports = mongoose.model('User', user_schema);