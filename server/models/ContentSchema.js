const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  contentType: {
    required: true,
    type: String,
    enum: ['articles', 'q&a', 'prompts'],
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('Content', ContentSchema);
