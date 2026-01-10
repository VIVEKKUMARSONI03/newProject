const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

module.exports = mongoose.model('User', userSchema);