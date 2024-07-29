const TimeSerie = require('../models/CheckInSchema');

const insertTimeSeries = async (req, res) => {
  const data = req.body;

  try {
    const newTimeSeries = new TimeSerie(data);
    await newTimeSeries.save();
    console.log('Data saved:', data);
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
    email, userId, startDate, midDate, endDate, period,
  } = req.body;

  try {
    const timeSeries = await TimeSerie.aggregate([
      {
        $match: {
          'metadata.email': email,
          'metadata.userId': userId,
          timestamp: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          moodValue: { $exists: true, $ne: null },
          sleepScore: { $exists: true, $ne: null },
          energyChosen: { $exists: true, $ne: null },
        },
      },
      { $sort: { timestamp: 1 } }, // sort by timestamp
    ]);

    // helper function to insert dummy data
    // const fillGaps = (data) => {
    //   if (!data || data.length === 0) return [];

    //   const filledData = [];
    //   for (let i = 0; i < data.length - 1; i += 1) {
    //     filledData.push(data[i]);
    //     const currentDate = new Date(data[i].label);
    //     const nextDate = new Date(data[i + 1].label);
    //     const dayDifference = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

    //     if (dayDifference > 1) {
    //       for (let j = 1; j < dayDifference; j += 1) {
    //         const newDate = new Date(currentDate);
    //         newDate.setDate(newDate.getDate() + j);
    //         const interpolatedValue = data[i].value + (
    //           data[i + 1].value - data[i].value
    //         ) * (j / dayDifference);
    //         filledData.push({
    //           value: parseFloat(interpolatedValue.toFixed(2)),
    //           label: newDate.toISOString().slice(0, 10),
    //           isDummy: true,
    //         });
    //       }
    //     }
    //   }
    //   filledData.push(data[data.length - 1]);

    //   // Add logging to debug the filled data
    //   console.log('Original data:', data);
    //   console.log('Filled data:', filledData);

    //   return filledData;
    // };
    const fillGaps = (data, startDate, endDate) => {
      const filledData = [];
      const currentDate = new Date(startDate);
      const end = new Date(endDate);

      let dataIndex = 0;

      while (currentDate <= end) {
        const currentDateString = currentDate.toISOString().slice(0, 10);

        if (dataIndex < data.length && data[dataIndex].label === currentDateString) {
          filledData.push(data[dataIndex]);
          dataIndex += 1;
        } else {
          filledData.push({
            value: 0, // maybe change - do average?
            label: currentDateString,
            isDummy: true,
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log('Original data:', data);
      console.log('Filled data:', filledData);

      return filledData;
    };

    const firstPeriod = timeSeries.filter((item) => item.timestamp <= new Date(midDate));
    const secondPeriod = timeSeries.filter((item) => item.timestamp > new Date(midDate));

    let message = false;
    const minEntries = period === 'Month' ? 21 : 5;

    if (firstPeriod.length < minEntries || secondPeriod.length < minEntries) {
      message = true;
    }

    const startFirstPeriod = new Date(startDate).toISOString().slice(0, 10);
    const endFirstPeriod = new Date(midDate).toISOString().slice(0, 10);
    const startSecondPeriod = new Date(midDate).toISOString().slice(0, 10);
    const endSecondPeriod = new Date(endDate).toISOString().slice(0, 10);

    const firstPeriodMood = fillGaps(firstPeriod.map((item) => (
      { value: item.moodValue, label: item.timestamp.toISOString().slice(0, 10) }
    )), startFirstPeriod, endFirstPeriod);
    const secondPeriodMood = fillGaps(secondPeriod.map((item) => (
      { value: item.moodValue, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod);

    const firstPeriodSleep = fillGaps(firstPeriod.map((item) => (
      { value: item.sleepScore, label: item.timestamp.toISOString().slice(0, 10) }
    )), startFirstPeriod, endFirstPeriod);
    const secondPeriodSleep = fillGaps(secondPeriod.map((item) => (
      { value: item.sleepScore, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod);

    const firstPeriodEnergy = fillGaps(firstPeriod.map((item) => (
      { value: item.energyChosen, label: item.timestamp.toISOString().slice(0, 10) }
    )), startFirstPeriod, endFirstPeriod);
    const secondPeriodEnergy = fillGaps(secondPeriod.map((item) => (
      { value: item.energyChosen, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod);

    const calculateAvg = (data) => data.filter(
      (item) => !item.isDummy,
    ).reduce((sum, item) => sum + item.value, 0) / data.filter((item) => !item.isDummy).length;

    const avgFirstPeriodMood = calculateAvg(firstPeriodMood);
    const avgSecondPeriodMood = calculateAvg(secondPeriodMood);

    const avgFirstPeriodSleep = calculateAvg(firstPeriodSleep);
    const avgSecondPeriodSleep = calculateAvg(secondPeriodSleep);

    const avgFirstPeriodEnergy = calculateAvg(firstPeriodEnergy);
    const avgSecondPeriodEnergy = calculateAvg(secondPeriodEnergy);

    const percentageChange = (newAvg, oldAvg) => ((newAvg - oldAvg) / oldAvg) * 100;

    const PercentageAvgMood = percentageChange(avgSecondPeriodMood, avgFirstPeriodMood);
    const PercentageAvgSleep = percentageChange(avgSecondPeriodSleep, avgFirstPeriodSleep);
    const PercentageAvgEnergy = percentageChange(avgSecondPeriodEnergy, avgFirstPeriodEnergy);

    console.log('PercentageAvgMood: ', PercentageAvgMood);

    res.send({
      message,
      PercentageAvgMood: PercentageAvgMood || 0,
      PercentageAvgSleep: PercentageAvgSleep || 0,
      PercentageAvgEnergy: PercentageAvgEnergy || 0,
      firstPeriod: {
        MoodData: firstPeriodMood || [],
        SleepData: firstPeriodSleep || [],
        EnergyData: firstPeriodEnergy || [],
      },
      secondPeriod: {
        MoodData: secondPeriodMood || [],
        SleepData: secondPeriodSleep || [],
        EnergyData: secondPeriodEnergy || [],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: false,
      PercentageAvgMood: 0,
      PercentageAvgSleep: 0,
      PercentageAvgEnergy: 0,
      firstPeriod: {
        MoodData: [],
        SleepData: [],
        EnergyData: [],
      },
      secondPeriod: {
        MoodData: [],
        SleepData: [],
        EnergyData: [],
      },
      error: 'Failed to fetch data',
    });
  }
};

// const getUserTimeSeries = async (req, res) => {
//   console.log('getUserTimeSeries');

//   const {
//     email, userId, startDate, midDate, endDate,
//   } = req.body;

//   try {
//     const timeSeries = await TimeSerie.aggregate([
//       {
//         $match: {
//           'metadata.email': email,
//           'metadata.userId': userId,
//           timestamp: {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//           },
//           moodValue: { $exists: true, $ne: null },
//           sleepScore: { $exists: true, $ne: null },
//           energyChosen: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $facet: {
//           firstPeriod: [
//             {
//               $match: {
//                 timestamp: { $lte: new Date(midDate) },
//               },
//             },
//             { $sort: { timestamp: -1 } },
//             { $limit: 10 },
//             {
//               $group: {
//                 _id: null,
//                 MoodData: {
//                   $push: {
//                     value: '$moodValue',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 SleepData: {
//                   $push: {
//                     value: '$sleepScore',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 EnergyData: {
//                   $push: {
//                     value: '$energyChosen',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 avgMood: { $avg: '$moodValue' },
//                 avgSleep: { $avg: '$sleepScore' },
//                 avgEnergy: { $avg: '$energyChosen' },
//               },
//             },
//           ],
//           secondPeriod: [
//             {
//               $match: {
//                 timestamp: { $gt: new Date(midDate) },
//               },
//             },
//             { $sort: { timestamp: -1 } },
//             { $limit: 10 },
//             {
//               $group: {
//                 _id: null,
//                 MoodData: {
//                   $push: {
//                     value: '$moodValue',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 SleepData: {
//                   $push: {
//                     value: '$sleepScore',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 EnergyData: {
//                   $push: {
//                     value: '$energyChosen',
//                     label: { $dateToString: { format: '%m-%d', date: '$timestamp' } },
//                   },
//                 },
//                 avgMood: { $avg: '$moodValue' },
//                 avgSleep: { $avg: '$sleepScore' },
//                 avgEnergy: { $avg: '$energyChosen' },
//               },
//             },
//           ],
//         },
//       },
//       {
//         $project: {
//           PercentageAvgMood: {
//             $multiply: [
//               {
//                 $divide: [
//                   {
//                     $subtract: [
//                       { $arrayElemAt: ['$secondPeriod.avgMood', 0] },
//                       { $arrayElemAt: ['$firstPeriod.avgMood', 0] },
//                     ],
//                   },
//                   { $arrayElemAt: ['$firstPeriod.avgMood', 0] },
//                 ],
//               },
//               100,
//             ],
//           },
//           PercentageAvgSleep: {
//             $multiply: [
//               {
//                 $divide: [
//                   {
//                     $subtract: [
//                       { $arrayElemAt: ['$secondPeriod.avgSleep', 0] },
//                       { $arrayElemAt: ['$firstPeriod.avgSleep', 0] },
//                     ],
//                   },
//                   { $arrayElemAt: ['$firstPeriod.avgSleep', 0] },
//                 ],
//               },
//               100,
//             ],
//           },
//           PercentageAvgEnergy: {
//             $multiply: [
//               {
//                 $divide: [
//                   {
//                     $subtract: [
//                       { $arrayElemAt: ['$secondPeriod.avgEnergy', 0] },
//                       { $arrayElemAt: ['$firstPeriod.avgEnergy', 0] },
//                     ],
//                   },
//                   { $arrayElemAt: ['$firstPeriod.avgEnergy', 0] },
//                 ],
//               },
//               100,
//             ],
//           },
//           firstPeriod: {
//             $ifNull: [{ $arrayElemAt: ['$firstPeriod', 0] }, {
//               MoodData: [], SleepData: [], EnergyData: [], avgMood: 0, avgSleep: 0, avgEnergy: 0,
//             }],
//           },
//           secondPeriod: {
//             $ifNull: [{ $arrayElemAt: ['$secondPeriod', 0] }, {
//               MoodData: [], SleepData: [], EnergyData: [], avgMood: 0, avgSleep: 0, avgEnergy: 0,
//             }],
//           },
//         },
//       },
//     ]);
//     res.send(timeSeries);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };

const sampleData = [
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-06T12:00:00.000Z'),
    moodValue: 3,
    sleepScore: 3,
    energyChosen: 4,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-07T12:00:00.000Z'),
    moodValue: 2,
    sleepScore: 4,
    energyChosen: 2,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-08T12:00:00.000Z'),
    moodValue: 3,
    sleepScore: 3,
    energyChosen: 4,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-09T12:00:00.000Z'),
    moodValue: 2,
    sleepScore: 4,
    energyChosen: 5,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-10T12:00:00.000Z'),
    moodValue: 3,
    sleepScore: 3,
    energyChosen: 3,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-11T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 4,
    energyChosen: 1,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-12T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 3,
    energyChosen: 2,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-13T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 4,
    energyChosen: 1,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-14T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 3,
    energyChosen: 2,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-07-15T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 4,
    energyChosen: 1,
  },
];

const InsertManyExamples = async (req, res) => {
  console.log('Insert Many Examples');
  try {
    await TimeSerie.insertMany(sampleData);
    console.log('Sample data inserted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  insertTimeSeries, InsertManyExamples, getUserTimeSeries, checkExistingCheckIn,
};

// module.exports = {
//   getUserTimeSeries,
// };

// const TimeSerie = require('../models/TimeSerieSchema');

// const getUserTimeSeries = async (req, res) => {
//   console.log('getUserTimeSeries');

//   const {
//     email, userId, startDate, midDate, endDate,
//   } = req.body;

//   try {
//     const Sleeptimeseries = await TimeSerie.aggregate([
//       {
//         $match:
//         {
//           metadata: {
//             email,
//             userId,
//           },
//           timestamp: {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//           },
//           sleep: { $exists: true, $ne: null },
//           waterIntake: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $facet: {
//           firstPeriod: [
//             {
//               $match: {
//                 timestamp: { $lte: new Date(midDate) },
//               },
//             },
//             {
//               $group: {
//                 _id: null,
//                 SleepData: {
//                   $push: {
//                     value: '$sleep',
//                     label: {
//                       $switch: {
//                         branches: [
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
//                         ],
//                         default: 'Unknown',
//                       },
//                     },
//                   },
//                 },
//                 WaterData: {
//                   $push: {
//                     value: '$waterIntake',
//                     label: {
//                       $switch: {
//                         branches: [
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
//                         ],
//                         default: 'Unknown',
//                       },
//                     },
//                   },
//                 },
//                 avgSleep: { $avg: '$sleep' },
//                 avgWater: { $avg: '$waterIntake' },
//               },
//             },
//           ],
//           secondPeriod: [
//             {
//               $match: {
//                 timestamp: { $gt: new Date(midDate) },
//               },
//             },
//             {
//               $group: {
//                 _id: null,
//                 SleepData: {
//                   $push: {
//                     value: '$sleep',
//                     label: {
//                       $switch: {
//                         branches: [
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
//                         ],
//                         default: 'Unknown',
//                       },
//                     },
//                   },
//                 },
//                 WaterData: {
//                   $push: {
//                     value: '$waterIntake',
//                     label: {
//                       $switch: {
//                         branches: [
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 1] }, then: 'U' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 2] }, then: 'M' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 3] }, then: 'T' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 4] }, then: 'W' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 5] }, then: 'R' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 6] }, then: 'F' },
//                           { case: { $eq: [{ $dayOfWeek: '$timestamp' }, 7] }, then: 'S' },
//                         ],
//                         default: 'Unknown',
//                       },
//                     },
//                   },
//                 },
//                 avgSleep: { $avg: '$sleep' },
//                 avgWater: { $avg: '$waterIntake' },
//               },
//             },
//           ],
//         },
//       },
//       {
//         $project: {
//           PercentageAvgSleep: {
//             $multiply: [
//               {
//                 $divide: [
//                   {
//                     $subtract: [
//                       {
//                         $arrayElemAt: [
//                           '$secondPeriod.avgSleep',
//                           0,
//                         ],
//                       },
//                       {
//                         $arrayElemAt: [
//                           '$firstPeriod.avgSleep',
//                           0,
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     $arrayElemAt: [
//                       '$firstPeriod.avgSleep',
//                       0,
//                     ],
//                   },
//                 ],
//               },
//               100,
//             ],
//           },
//           PercentageAvgWater: {
//             $multiply: [
//               {
//                 $divide: [
//                   {
//                     $subtract: [
//                       {
//                         $arrayElemAt: [
//                           '$secondPeriod.avgWater',
//                           0,
//                         ],
//                       },
//                       {
//                         $arrayElemAt: [
//                           '$firstPeriod.avgWater',
//                           0,
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     $arrayElemAt: [
//                       '$firstPeriod.avgWater',
//                       0,
//                     ],
//                   },
//                 ],
//               },
//               100,
//             ],
//           },
//           firstPeriod: { $arrayElemAt: ['$firstPeriod', 0] },
//           secondPeriod: { $arrayElemAt: ['$secondPeriod', 0] },
//         },
//       },
//     ]);
//     res.send(Sleeptimeseries);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };

// const InsertManyExamples = async (req, res) => {
//   console.log('Insert Many Examples');
//   try {
//     await TimeSerie.insertMany(
//       [
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-22T12:00:00.000Z'),
//           sleep: 1,
//           waterIntake: 2,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-23T12:00:00.000Z'),
//           sleep: 3,
//           waterIntake: 1,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-24T12:00:00.000Z'),
//           sleep: 2,
//           waterIntake: 2,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-25T12:00:00.000Z'),
//           sleep: 4,
//           waterIntake: 2,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-26T12:00:00.000Z'),
//           sleep: 2,
//           waterIntake: 6,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-27T12:00:00.000Z'),
//           sleep: 3,
//           waterIntake: 4,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-28T12:00:00.000Z'),
//           sleep: 6,
//           waterIntake: 6,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-29T12:00:00.000Z'),
//           sleep: 5,
//           waterIntake: 7,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-06-30T12:00:00.000Z'),
//           sleep: 3,
//           waterIntake: 4,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-07-01T12:00:00.000Z'),
//           sleep: 2,
//           waterIntake: 5,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-07-02T12:00:00.000Z'),
//           sleep: 5,
//           waterIntake: 2,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-07-03T12:00:00.000Z'),
//           sleep: 6,
//           waterIntake: 4,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-07-04T12:00:00.000Z'),
//           sleep: 7,
//           waterIntake: 3,
//         },
//         {
//           metadata: {
//             email: 'booooooop',
//             userId: 'booop',
//           },
//           timestamp: new Date('2024-07-05T12:00:00.000Z'),
//           sleep: 5,
//           waterIntake: 5,
//         },
//       ],
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };

// module.exports = {
//   InsertManyExamples, getUserTimeSeries,
// };
