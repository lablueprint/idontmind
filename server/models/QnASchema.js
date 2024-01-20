const mongoose = require('mongoose');

const QnASchema = new mongoose.Schema({
  // id of the content object it maps to
  metadataID: {
    required: true,
    type: String,
  },
  answered: {
    default: false,
    type: Boolean,
  },
  question: {
    default: '',
    type: String,
  },
  answer: {
    default: '',
    type: String,
  },
  whoAnswered: {
    default: '',
    type: String,
  },
});

module.exports = mongoose.model('QnA', QnASchema);
