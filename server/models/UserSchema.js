const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: Number,
  },
  timestamp: {
    required: true,
    type: Date,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
