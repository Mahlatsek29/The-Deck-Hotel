const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    roomcategory: {
        type: Number,
        required: true
    },
    nightlyrate: {
        type: Number,
        required: true
    },
    imageurl : [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})
const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel