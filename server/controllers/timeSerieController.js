const TimeSerie = require('../models/TimeSerieSchema');

const getAllTimeSeries = async (req, res) => {
  console.log('getAllTimeSeries');
  const {
    email, userId, startDate, endDate,
  } = req.body;
  try {
    const timeseries = await TimeSerie.aggregate([
      {
        $match:
        {
          metadata: {
            email,
            userId,
          },
          timestamp: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
          sleep: { $exists: true, $ne: null },
          waterIntake: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: { value: '$sleep', timestamp: '$timestamp' } },
          data2: { $push: { value: '$waterIntake', timestamp: '$timestamp' } },
          avgSleep: { $avg: '$sleep' },
          avgWater: { $avg: '$waterIntake' },
        },
      },
      {
        $project: {
          _id: 0,
          data: 1,
          data2: 1,
          avgSleep: 1,
          avgWater: 1,
          avgData: { $multiply: [{ $divide: [{ $multiply: ['$avgSleep', '$avgWater'] }, '$avgWater'] }, 100] },
        },
      },
    ]);
    res.send(timeseries);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const InsertManyExamples = async (req, res) => {
  console.log('Insert Many Examples');
  const { leftDate, rightDate } = req.body;
  console.log(leftDate);
  console.log(rightDate);
  try {
    await TimeSerie.insertMany([
      {
        metadata: {
          email: 'booooooop',
          userId: 'booop',
        },
        timestamp: new Date('2024-04-17T12:00:00.000Z'),
        sleep: 1,
        waterIntake: 2,
      },
      {
        metadata: {
          email: 'booooooop',
          userId: 'booop',
        },
        timestamp: new Date('2024-04-02T12:00:00.000Z'),
        sleep: 3,
        waterIntake: 1,
      },
      {
        metadata: {
          email: 'booooooop',
          userId: 'booop',
        },
        timestamp: new Date('2024-04-01T12:00:00.000Z'),
        sleep: 7,
        waterIntake: 6,
      },
      {
        metadata: {
          email: 'booooooop',
          userId: 'booop',
        },
        timestamp: new Date('2024-04-10T12:00:00.000Z'),
        sleep: 1,
        waterIntake: 2,
      },
      {
        metadata: {
          email: 'booooooop',
          userId: 'booop',
        },
        timestamp: new Date('2024-04-7T12:00:00.000Z'),
        sleep: 3,
        waterIntake: 8,
      },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllTimeSeries, InsertManyExamples,
};
