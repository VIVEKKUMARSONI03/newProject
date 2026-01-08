const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
      name:{
         type: String,
         required: true
      },

      email:{
         type: String,
         required: true
      },

      password:{
        type: String,
        required: true
      }, 

      location:{
        type: Number,
        required : true
      },

      branch:{
        type : mongoose.Schema.ObjectId,
        ref : 'Branch',
        required: true
      }
})

module.exports = mongoose.model('Admin', userSchema);