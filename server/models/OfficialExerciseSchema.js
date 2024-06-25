const mongoose = require('mongoose');

const OfficialExerciseSchema = new mongoose.Schema({
  subtitle: {
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

module.exports = mongoose.model('OfficialExercise', OfficialExerciseSchema, 'officialcoping-ground');
