const mongoose = require('mongoose');

var run_schema = new mongoose.Schema({
    title: {
        type: String,
        default: "Run",
        maxlength: 100,
        minlength: 1,
        required: true
    },
    description: {
        type: String,
        maxlength: 500,
        minlength: 10,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    recurrence: {
        type: String,
        default: "none",
        enum: [
            "daily",
            "weekly",
            "monthly",
            "none"
        ],
        required: true
    },
    location: {
        formatted: {
            type: String,
            maxlength: 100,
            minlength: 1,
            required: true
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
            required: true
        }
    },
    distance: {
        type: Number,
        default: 1,
        min: 0,
        required: true
    },
    pace: {
        type: Number,
        default: 6,
        min: 0,
        required: true
    },
    water_spot: {
        type: Boolean,
        default: false
    },
    bag_drop: {
        type: Boolean,
        default: false
    },
    post_event: {
        type: Boolean,
        default: false
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    original_run: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Run',
        default: function() {
            return this._id;
        }
    }
});

module.exports = mongoose.model('Run', run_schema);