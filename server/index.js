require('dotenv').config();

// Module Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('./passport');
const LoginUser = require('./models/UserSchema');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// JWT Authentication Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

// Route Imports
const testRouter = require('./routes/testRoute');
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

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
app.use(passport.initialize());

// API Routes
app.use('/test', testRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// JWT Authentication for /protected route
passport.use(
  new jwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await LoginUser.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
