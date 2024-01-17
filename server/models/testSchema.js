const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const testSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Test', testSchema);
