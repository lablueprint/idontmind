const TimeSerie = require('../models/TimeSerieSchema');

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
          timestamp: new Date('2024-06-22T12:00:00.000Z'),
          sleep: 1,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-23T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 1,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-24T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-25T12:00:00.000Z'),
          sleep: 4,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-26T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 6,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-27T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-28T12:00:00.000Z'),
          sleep: 6,
          waterIntake: 6,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-29T12:00:00.000Z'),
          sleep: 5,
          waterIntake: 7,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-06-30T12:00:00.000Z'),
          sleep: 3,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-07-01T12:00:00.000Z'),
          sleep: 2,
          waterIntake: 5,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-07-02T12:00:00.000Z'),
          sleep: 5,
          waterIntake: 2,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-07-03T12:00:00.000Z'),
          sleep: 6,
          waterIntake: 4,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-07-04T12:00:00.000Z'),
          sleep: 7,
          waterIntake: 3,
        },
        {
          metadata: {
            email: 'booooooop',
            userId: 'booop',
          },
          timestamp: new Date('2024-07-05T12:00:00.000Z'),
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
  InsertManyExamples, getUserTimeSeries,
};
