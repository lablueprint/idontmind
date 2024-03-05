const mongoose = require('mongoose');

const checkInPreferenceSchema = new mongoose.Schema({
  category1: {
    type: [String],
    default: [],
  },
  category2: {
    type: String,
  },
  category3: {
    type: String,
  },
});

const officialUserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  profilePicture: {
    required: false,
    type: String,
  },
  banTags: {
    default: [],
    type: [String],
  },
  journalEntries: {
    default: [],
    type: [String],
  },
  favorites: {
    default: [],
    type: [String],
  },
  checkInPreferences: {
    default: {},
    type: checkInPreferenceSchema,
  },
  pushNotifs: {
    default: {
      time: null,
      reminders: [],
    },
    type: Object,
  },
});

module.exports = mongoose.model('OfficialUser', officialUserSchema);
