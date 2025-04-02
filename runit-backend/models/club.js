const mongoose = require('mongoose');

var club_schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    },
    description: {
        type: String,
        maxlength: 400,
        minlength: 10,
        required: true
    },
    location: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true
    },
    logo: {
        type: String
    },
    logo_url: {
        url: { type: String },
        valid_until: { type: Date }
    },
    cover_picture: { type: String },
    cover_picture_url: {
        url: { type: String },
        valid_until: { type: Date }
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    leaders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    runs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Run' }]
});

module.exports = mongoose.model('Club', club_schema);