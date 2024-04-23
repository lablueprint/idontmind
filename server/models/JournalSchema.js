const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const journalSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  prompt: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  timestamp: {
    required: true,
    type: Date,
  },
  image: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('Journal', journalSchema);
