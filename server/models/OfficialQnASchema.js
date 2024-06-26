const mongoose = require('mongoose');

const OfficialQnASchema = new mongoose.Schema({
  question: {
    default: '',
    type: String,
  },
  tags: {
    default: [],
    type: [String],
  },
  answer: {
    default: '',
    type: String,
  },
  answered: {
    default: false,
    type: Boolean,
  },
  who_answered: {
    default: '',
    type: String,
  },
});

module.exports = mongoose.model('OfficialQ&A', OfficialQnASchema, 'officialq&a');
