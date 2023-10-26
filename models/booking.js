const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room: {
        type: String
    },
    roomid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' 
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    fromdate: {
        type: String,
        required: true
    },
    todate: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number, 
        required: true
    },
    totaldays: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
}, {
    timestamps: true,
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;
