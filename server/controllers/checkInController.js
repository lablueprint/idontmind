//  connect to db function
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const connectToDatabaseTimeSeries = async () => {
  try {
    // Connect
    await client.connect();

    // Access the database and create the collection with options
    const db = client.db('test');

    const collectionOptions = {
      timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours',
      },
      expireAfterSeconds: 31560000, // Expiration of docs after one year
    };

    // Check if the collection already exists and create it if it doesn't
    const existingCollections = await db.listCollections().toArray();
    const collectionExists = existingCollections.some((collection) => collection.name === 'checkin_time_series');
    if (!collectionExists) {
      await db.createCollection('checkin_time_series', collectionOptions);
      console.log('Collection created successfully');
    }

    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

const createCheckIn = async (data) => {
  try {
    const db = await connectToDatabaseTimeSeries();
    const collection = db.collection('checkin_time_series');
    await collection.insertMany([
      {
        metadata: { userId: 'booop', email: 'booooooop' },
        timestamp: new Date(),
        moods: data.body.moodsText,
        activity: data.body.activityText,
        sleep: data.body.sleep,
      },
    ]);
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

//  connect to db function
// another function that takes in a json {basically a dictionary}
// and uses the previous function to connect and then does .insertMany
// and then link this function to a route, that way we can protect it.

// const createCheckIn = async (req, res) => {
//   console.log('ran createCheckIn');
//   const test = new CheckIn(req.body);
//   try {
//     const data = await test.save(test);
//     console.log(data);
//     res.send(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = {
  createCheckIn,
};
