const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    branchcode:{
        type: Number,
        required: true,
        unique: true
    },

    location: {
        type: Object,
        required: true
    },
    
    contactInfo : {
        type: Number
    }
})

module.exports = mongoose.model('Branch', branchSchema);