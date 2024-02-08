const mongoose = require('mongoose');

const QnASchema = new mongoose.Schema({
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
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('QnA', QnASchema);
