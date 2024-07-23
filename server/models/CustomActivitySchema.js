const mongoose = require('mongoose');

const CustomActivitySchema = new mongoose.Schema({
  email: { type: String, required: true },
  activity: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('CustomActivity', CustomActivitySchema, 'custom_activities');
