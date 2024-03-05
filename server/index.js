require('dotenv').config();

// Module Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// console.log(uri);
// console.log(port);

// Route Imports
const testRouter = require('./routes/testRoute');
const journalRouter = require('./routes/journalRoute');
const postRouter = require('./routes/postRoute');
const contentRouter = require('./routes/contentRoute');
const offJournalRouter = require('./routes/offJournalRoute');
const offUserRouter = require('./routes/offUserRoute');
const checkInRouter = require('./routes/checkInRoute');
const { timeSeriesCreation } = require('./timeSeries');

timeSeriesCreation();

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

// Start the Node Express server
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/test', testRouter);
app.use('/journals', journalRouter);
app.use('/posts', postRouter);
app.use('/content', contentRouter);
app.use('/offUser', offUserRouter);
app.use('/offJournal', offJournalRouter);
app.use('/checkins', checkInRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
