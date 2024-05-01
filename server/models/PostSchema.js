// This file and all of the Post related files are temporary and primarily used as examples
// Currently, they also act as a quick way to visually check for successful MongoDB connection.
const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const postSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  timestamp: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
