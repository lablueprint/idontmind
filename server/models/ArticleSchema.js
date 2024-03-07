const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
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
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
