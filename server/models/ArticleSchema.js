const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  // id of the content object it maps to
  metadataID: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  publishDate: {
    required: true,
    type: Date,
  },
  author: {
    default: '',
    type: String,
  },
  bodyExcerpts: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
