const mongoose = require('mongoose');

const TimeSerie = new mongoose.Schema(
  {
    metadata: {
      email: String,
      userId: String,
    },
    timestamp: Date,
    sleep: Number,
    waterIntake: Number,
    numPages: Number,
    moodValue: Number,
    moodsChosen: [String],
    energyChosen: Number,
    sleepScore: Number,
    hasHadMeal: Boolean,
    water: String,
    exercise: String,
    activityChosen: String,
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours',
    },
  },
);

module.exports = mongoose.model('checkin_time_serie', TimeSerie);
