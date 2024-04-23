const mongoose = require('mongoose');

const officialJournalSchema = new mongoose.Schema({
  username: {
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
  creationTime: {
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
  image: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model('OfficialJournal', officialJournalSchema);
