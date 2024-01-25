const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const passport = require('../passport');

// Creates user with given email and password to send to backend
const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
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

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, 'secret');

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

const authenticatePassport = passport.authenticate('jwt', { session: false });

module.exports = {
  signInUser,
  signUpUser,
  welcomeUser,
  authenticatePassport,
};
