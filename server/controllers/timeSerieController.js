const TimeSerie = require('../models/TimeSerieSchema');

const insertTimeSeries = async (req, res) => {
  const data = req.body;

  try {
    const newTimeSeries = new TimeSerie(data);
    await newTimeSeries.save();
    console.log('Data saved:', data); // Add logging here
    res.status(201).send({ message: 'Time series data saved successfully' });
  } catch (err) {
    console.error('Error saving data:', err); // Add logging here
    res.status(500).send({ error: 'Failed to save time series data' });
  }
};

const checkExistingCheckIn = async (req, res) => {
  try {
    const { email } = req.query;
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const existingCheckIn = await TimeSerie.findOne({
      'metadata.email': email,
      timestamp: { $gte: startOfDay },
    });

    if (existingCheckIn) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Failed to check existing check-in:', error.message);
    res.status(500).json({ error: 'Failed to check existing check-in' });
  }
};

module.exports = {
  insertTimeSeries,
};

const getUserTimeSeries = async (req, res) => {
  console.log('getUserTimeSeries');

  const {
    email, userId, startDate, midDate, endDate,
  } = req.body;

  try {
    const Sleeptimeseries = await TimeSerie.aggregate([
      {
        $match:
        {
          metadata: {
            email,
            userId,
          },
          timestamp: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          sleep: { $exists: true, $ne: null },
          waterIntake: { $exists: true, $ne: null },
        },
      },
      {
        $facet: {
          firstPeriod: [
            {
              $match: {
                timestamp: { $lte: new Date(midDate) },
              },
            },
            {
              $group: {
                _id: null,
                SleepData: {
                  $push: {
                    value: '$sleep',
                    label: {
                      $switch: {
                        branches: [
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
                        ],
                        default: 'Unknown',
                      },
                    },
                  },
                },
                WaterData: {
                  $push: {
                    value: '$waterIntake',
                    label: {
                      $switch: {
                        branches: [
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
                        ],
                        default: 'Unknown',
                      },
                    },
                  },
                },
                avgSleep: { $avg: '$sleep' },
                avgWater: { $avg: '$waterIntake' },
              },
            },
          ],
          secondPeriod: [
            {
              $match: {
                timestamp: { $gt: new Date(midDate) },
              },
            },
            {
              $group: {
                _id: null,
                SleepData: {
                  $push: {
                    value: '$sleep',
                    label: {
                      $switch: {
                        branches: [
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
                        ],
                        default: 'Unknown',
                      },
                    },
                  },
                },
                WaterData: {
                  $push: {
                    value: '$waterIntake',
                    label: {
                      $switch: {
                        branches: [
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
                          { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
                        ],
                        default: 'Unknown',
                      },
                    },
                  },
                },
                avgSleep: { $avg: '$sleep' },
                avgWater: { $avg: '$waterIntake' },
              },
            },
          ],
        },
      },
      {
        $project: {
          PercentageAvgSleep: {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: [
                      {
                        $arrayElemAt: [
                          '$secondPeriod.avgSleep',
                          0,
                        ],
                      },
                      {
                        $arrayElemAt: [
                          '$firstPeriod.avgSleep',
                          0,
                        ],
                      },
                    ],
                  },
                  {
                    $arrayElemAt: [
                      '$firstPeriod.avgSleep',
                      0,
                    ],
                  },
                ],
              },
              100,
            ],
          },
          PercentageAvgWater: {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: [
                      {
                        $arrayElemAt: [
                          '$secondPeriod.avgWater',
                          0,
                        ],
                      },
                      {
                        $arrayElemAt: [
                          '$firstPeriod.avgWater',
                          0,
                        ],
                      },
                    ],
                  },
                  {
                    $arrayElemAt: [
                      '$firstPeriod.avgWater',
                      0,
                    ],
                  },
                ],
              },
              100,
            ],
          },
          firstPeriod: { $arrayElemAt: ['$firstPeriod', 0] },
          secondPeriod: { $arrayElemAt: ['$secondPeriod', 0] },
        },
      },
    ]);
    res.send(Sleeptimeseries);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const findLastDays = async (req, res) => {

  const { email, userId, timestamp, days } = req.body;

  try {
    // Ensure timestamp is a valid Date object
    const endDate = new Date(timestamp);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    startDate.setHours(0,0,0,0);
    endDate.setHours(23, 59, 59, 999);

    const data = await TimeSerie.aggregate([
      {
        $match: {
          'metadata.email': email,
          'metadata.userId': userId,
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
            },
            time: {
              $dateToString: { format: "%H:%M:%S", date: "$timestamp" },
            },
          },
          sleep: { $first: '$sleep' },
          waterIntake: { $first: '$waterIntake' },
          metadata: { $first: '$metadata' },
          timestamp: { $first: '$timestamp' },
        },
      },
      {
        $project: {
          _id: 0,
          timestamp: "$timestamp",
          sleep: 1,
          waterIntake: 1,
          metadata: 1,
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 1] }, then: 'Sunday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 2] }, then: 'Monday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 3] }, then: 'Tuesday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 4] }, then: 'Wednesday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 5] }, then: 'Thursday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 6] }, then: 'Friday' },
                { case: { $eq: [{ $dayOfWeek: "$timestamp" }, 7] }, then: 'Saturday' },
              ],
              default: 'Unknown',
            },
          },
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ]);

    // Return the found documents
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const InsertManyExamples = async (req, res) => {
  console.log('Insert Many Examples');
  try {
    await TimeSerie.insertMany(
      [
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-01T12:00:00.000Z'),
          sleep: 1,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-02T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 1,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-03T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-04T12:00:00.000Z'),
          sleep: 4,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-05T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 6,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-06T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-07T12:00:00.000Z'),
          sleep: 6,
          waterIntake: 6,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-08T12:00:00.000Z'),
          sleep: 5,
          waterIntake: 7,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-09T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-10T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 5,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-11T12:00:00.000Z'),
          sleep: 5,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-12T12:00:00.000Z'),
          sleep: 6,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-13T12:00:00.000Z'),
          sleep: 7,
          waterIntake: 3,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-01-14T12:00:00.000Z'),
          sleep: 5,
          waterIntake: 5,
        },
      ],
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  insertTimeSeries, InsertManyExamples, getUserTimeSeries, checkExistingCheckIn, findLastDays,
};
