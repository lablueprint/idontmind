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

    const fillGaps = (data, startDate, endDate, period) => {
      const filledData = [];
      const currentDate = new Date(startDate);
      const end = new Date(endDate);

      let dataIndex = 0;

      const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

      // Format the data dates to remove time part
      const formattedData = data.map((item) => ({
        ...item,
        label: new Date(item.label).toISOString().slice(0, 10),
        // Ensure label is in date-only format
      }));

      while (currentDate <= end) {
        const currentDateString = currentDate.toISOString().slice(0, 10);

        let label = '';
        if (period === 'Week') {
          label = daysOfWeek[currentDate.getDay()];
        } else if (period === 'Month' && currentDate.getDate() % 7 === 0) {
          label = currentDate.getDate().toString();
        }

        if (dataIndex < formattedData.length
          && formattedData[dataIndex].label === currentDateString) {
          filledData.push({ ...formattedData[dataIndex], label });
          dataIndex += 1;
        } else {
          filledData.push({
            value: 0.5, // maybe change - do average?
            label: label || '', // only add label if it's Week or valid day in Month
            isDummy: true,
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log('Original data:', data);
      console.log('Filled data:', filledData);

      return filledData;
    };

    const firstPeriod = timeSeries.filter((item) => item.timestamp < new Date(midDate));
    const secondPeriod = timeSeries.filter((item) => item.timestamp >= new Date(midDate));

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
    )), startFirstPeriod, endFirstPeriod, period);
    const secondPeriodMood = fillGaps(secondPeriod.map((item) => (
      { value: item.moodValue, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod, period);

    const firstPeriodSleep = fillGaps(firstPeriod.map((item) => (
      { value: item.sleepScore, label: item.timestamp.toISOString().slice(0, 10) }
    )), startFirstPeriod, endFirstPeriod, period);
    const secondPeriodSleep = fillGaps(secondPeriod.map((item) => (
      { value: item.sleepScore, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod, period);

    const firstPeriodEnergy = fillGaps(firstPeriod.map((item) => (
      { value: item.energyChosen, label: item.timestamp.toISOString().slice(0, 10) }
    )), startFirstPeriod, endFirstPeriod, period);
    const secondPeriodEnergy = fillGaps(secondPeriod.map((item) => (
      { value: item.energyChosen, label: item.timestamp.toISOString().slice(0, 10) }
    )), startSecondPeriod, endSecondPeriod, period);

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

const sampleData = [
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-08-04T12:00:00.000Z'),
    moodValue: 4,
    sleepScore: 3,
    energyChosen: 1,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-08-05T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 3,
    energyChosen: 2,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-08-07T12:00:00.000Z'),
    moodValue: 5,
    sleepScore: 3,
    energyChosen: 1,
  },
  {
    metadata: { email: 'user1@example.com', userId: 'user1' },
    timestamp: new Date('2024-08-08T12:00:00.000Z'),
    moodValue: 4,
    sleepScore: 3,
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
