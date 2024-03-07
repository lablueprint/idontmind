const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const checkInSchema = new mongoose.Schema({
  moodText: {
    required: true,
    type: String,
  },
  moodColor: {
    required: false,
    type: String,
  },
  sleep: {
    required: true,
    type: Number,
  },
  activity: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('CheckIn', checkInSchema);
