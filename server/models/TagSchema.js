const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const TagSchema = new mongoose.Schema({
  tagName: {
    required: true,
    type: String,
  },
  tagContentList: {
    default: [],
    type: Array,
  },
  tagBrief: {
    default: '',
    type: String,
  },

});

module.exports = mongoose.model('Tag', TagSchema);
