const mongoose = require('mongoose');

const OfficialStoriesSchema = new mongoose.Schema({
  content_type: {
    default: '',
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
  excerpt_titles: {
    default: [],
    type: [String],
  },
  excerpts: {
    default: [],
    type: [String],
  },
  link: {
    default: '',
    type: String,
  },
  tags: {
    default: [],
    type: [String],
  },
});

module.exports = mongoose.model('OfficialPersonal-Stories', OfficialStoriesSchema, 'officialpersonal-stories');
