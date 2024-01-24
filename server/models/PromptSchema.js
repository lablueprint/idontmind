const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  question: {
    required: true,
    type: String,
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('Prompt', PromptSchema);
