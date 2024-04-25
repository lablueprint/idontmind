const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const officialUserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: false,
    type: String,
  },
  username: {
    required: false,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
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

// Hashes password upon creation of user
officialUserSchema.pre('save', async function hashPass(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
  return null;
});

// Check if password is correct
officialUserSchema.methods.isValidPassword = async function check(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model('OfficialUser', officialUserSchema);
