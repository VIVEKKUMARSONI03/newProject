const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  location: {
    type: Number,
    required: true
  },

  branch: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch',
    required: true
  },
  refreshToken: {
    type: String
  }
})

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10)

})

module.exports = mongoose.model('Admin', adminSchema);