// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const timeSeriesCreation = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Time Series');

    // Specify database and collection names
    const databaseName = 'test';
    const collectionName = 'checkin_time_series1';
    // Access the database and create the collection with options
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const collectionOptions = {
      timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours',
      },
      expireAfterSeconds: 31560000, // Expiration of docs after one year
    };

    // Make sure to delete the collection in MongoDB if it exists already
    await db.createCollection(collectionName, collectionOptions);

    console.log(`Collection '${collectionName}' created with options:`, collectionOptions);

    // Example of inserting documents into the collection
    await collection.insertMany([
      {
        metadata: { userId: 'booop', email: 'booooooop' },
        timestamp: new Date('2021-05-18T00:00:00.000Z'),
        'water intake': 12, // Sample answer from quiz for User
        'sleep amt': 5,
      },
      {
        metadata: { userId: 'booops', email: 'booooooop' },
        timestamp: new Date('2021-05-18T12:00:00.000Z'),
        'water intake': 12,
      },
    ]);

    // Example of reading document dependent on timestamp
    // const response_read = await collection.findOne({
    //   timestamp: new Date('2021-05-18T00:00:00.000Z'),
    // });
    // console.log(response_read);
  } finally {
    // Closes the connection when done
    await client.close();
    console.log('Connection closed');
  }
};

/* To use in index.js:
  const { timeSeriesCreation } = require('./timeSeries');
  timeSeriesCreation();
*/
module.exports = {
  timeSeriesCreation,
};
