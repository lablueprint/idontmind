const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  // id of the content object it maps to
  metadataID: {
    required: true,
    type: String,
  },
  prompt: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Prompt', PromptSchema);
