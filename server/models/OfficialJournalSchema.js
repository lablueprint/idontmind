const mongoose = require('mongoose');

const officialJournalSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  prompt: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  wordCount: {
    required: true,
    type: Number,
  },
  creationTime: {
    required: true,
    type: Date,
  },
  modifiedTime: {
    required: true,
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
