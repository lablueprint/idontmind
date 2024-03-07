const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const passport = require('../passport');

// Creates user with given email, password, and to send to backend
const signUpUser = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).send({ message: 'This user already has an account' });
    }

    const user = new User({ email, password, firstName });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Signs in User and gives state id to differentiate user in backend
const signInUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }

    req.login(user, { session: false }, (loginErr) => {
      if (loginErr) return next(loginErr);

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, 'secret');

      console.log(user);

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

// Sample of returning given user information from backend
const getUserData = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    if (!user || user.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const authenticatePassport = passport.authenticate('jwt', { session: false });

module.exports = {
  signInUser,
  signUpUser,
  welcomeUser,
  authenticatePassport,
  getUserData,
};
