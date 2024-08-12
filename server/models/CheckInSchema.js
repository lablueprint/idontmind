const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const TimeSerie = new mongoose.Schema(
  {
    metadata: {
      email: String,
      userId: String,
    },
    timestamp: Date,
    moodValue: {
      required: true,
      type: Number,
    },
    sleepScore: {
      required: true,
      type: Number,
    },
    energyChosen: {
      required: true,
      type: Number,
    },
    hasHadMeal: {
      required: false,
      type: Boolean,
    },
    activityChosen: {
      required: false,
      type: Object,
    },
    moodsChosen: {
      required: false,
      type: Array,
    },
    numPages: {
      required: false,
      type: Number,
    },
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours',
    },
  },
);

module.exports = mongoose.model('checkin_time_series1', TimeSerie);
