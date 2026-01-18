const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    },
    location: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'undelivered',
        required: true,
    },
    payment_mode:{
        type : String,
        required: true
    },
    payment: {
        type: Boolean,
        default : false,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);