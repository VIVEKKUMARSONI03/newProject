const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}

}, {
    timestamps : true
})

module.exports = mongoose.model('Order', orderSchema);