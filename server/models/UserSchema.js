const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
