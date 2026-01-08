const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    location:{
        type: Number,
        required: true,
        unique: true
    },
    
    contactInfo : {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Branch', branchSchema);