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
  favoritedTags: {
    required: true,
    default: [],
    type: [String],
  },
  favoritedResources: {
    required: true,
    default: [],
    type: [String],
  },
  favoritedFolders: {
    required: true,
    default: {},
    type: Map,
    of: {
      description: {
        type: String,
        default: '',
      },
      tags: {
        type: [String],
        default: [],
      },
      resources: {
        type: [String],
        default: [],
      },
    },
  },
  tagToFolders: {
    required: true,
    default: {},
    type: Map,
    of: [String],
  },
  resourceToFolders: {
    required: true,
    default: {},
    type: Map,
    of: [String],
  },
  journalEntries: {
    default: [],
    type: [String],
  },
  favorites: {
    default: [],
    type: [Object],
  },
  // true if want to get notifs, false if not
  checkInPreference: {
    default: true,
    type: Boolean,
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
  code: {
    type: String,
    required: false,
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
