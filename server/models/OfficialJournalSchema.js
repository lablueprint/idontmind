const mongoose = require('mongoose');

const officialJournalSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  prompt: {
    default: '',
    type: String,
  },
  text: {
    default: '',
    type: String,
  },
  wordCount: {
    default: 0,
    type: Number,
  },
  timestamp: {
    default: new Date(),
    type: Date,
  },
  modifiedTime: {
    default: new Date(),
    type: Date,
  },
  tags: {
    default: [],
    type: [String],
  },
  type: {
    default: true,
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model('OfficialJournal', officialJournalSchema);
