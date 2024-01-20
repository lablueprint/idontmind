const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  // id of the resource it maps to
  resourceID: {
    required: true,
    type: String,
  },
  contentType: {
    required: true,
    type: String,
    enum: ['Article', 'QnA', 'Prompt'],
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('Content', ContentSchema);
