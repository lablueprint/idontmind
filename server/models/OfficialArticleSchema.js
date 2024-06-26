const mongoose = require('mongoose');

const OfficialArticleSchema = new mongoose.Schema({
  content_type: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  author: {
    default: '',
    type: String,
  },
  excerpts: {
    default: [],
    type: [String],
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('OfficialJournal-Article', OfficialArticleSchema, 'officialjournal-articles');