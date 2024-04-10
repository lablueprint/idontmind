const TimeSerie = require('../models/TimeSerieSchema');

const getAllTimeSeries = async (req, res) => {
  console.log('getAllTimeSeries');
  const { email, userId } = req.body;
  try {
    const timeseries = await TimeSerie.find({ metadata: { email, userId } });
    res.send(timeseries);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllTimeSeries,
};
