const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const postSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  timestamp: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model('Post', postSchema);
