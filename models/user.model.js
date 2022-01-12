const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  designation: String,
  phoneNumber: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
