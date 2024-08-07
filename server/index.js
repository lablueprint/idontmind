require('dotenv').config();

// Module Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bodyParser = require('body-parser');
const passport = require('./passport');
const User = require('./models/OfficialUserSchema');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// JWT Authentication Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

// Route Imports
const testRouter = require('./routes/miscRoute');
const contentRouter = require('./routes/contentRoute');
const offJournalRouter = require('./routes/offJournalRoute');
const offUserRouter = require('./routes/offUserRoute');
const timeSerieRouter = require('./routes/TimeSerieRoute');
const checkInRouter = require('./routes/checkInRoute');
const folderRouter = require('./routes/folderRoute');

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
app.use(express.json({ limit: '200mb' }));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// API Routes
app.use('/test', testRouter);
app.use('/content', contentRouter);
app.use('/offUser', offUserRouter);
app.use('/offJournal', offJournalRouter);
app.use('/timeSerie', timeSerieRouter);
app.use('/checkins', checkInRouter);
app.use('/folder', folderRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// JWT Authentication for /protected route
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
    return null;
  }),
);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
