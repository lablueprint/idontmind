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

const notificationPreferenceSchema = new mongoose.Schema({
  timeOfDay: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night'],
    default: 'morning',
  },
  recurrence: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
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
    type: [Object],
  },
  checkInPreferences: {
    default: undefined,
    type: checkInPreferenceSchema,
  },
  notificationPreferences: {
    default: undefined,
    type: notificationPreferenceSchema,
  },
  ChallengeDay: {
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model('OfficialUser', officialUserSchema);
