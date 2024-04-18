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
