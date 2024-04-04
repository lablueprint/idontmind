const mongoose = require('mongoose');

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
    type: [Object],
  },
  checkInPreferences: {
    default: {},
    type: Object,
  },
  pushNotifs: {
    default: {
      time: null,
      reminders: [],
    },
    type: Object,
  },
  ChallengeDay: {
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model('OfficialUser', officialUserSchema);
