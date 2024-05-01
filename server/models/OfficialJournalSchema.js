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
  guided: {
    default: true,
    type: Boolean,
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('OfficialJournal', officialJournalSchema);
