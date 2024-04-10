const mongoose = require('mongoose');

const TimeSerie = new mongoose.Schema({
  metadata: {
    required: true,
    type: Object,
  },
  'sleep amt': {
    default: '',
    type: String,
  },
  'water intake': {
    default: '',
    type: String,
  },
});

module.exports = mongoose.model('checkin_time_serie', TimeSerie);
