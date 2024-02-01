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
      const token = jwt.sign({ id: user._id }, 'secret');

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

const getUserData = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email: email })
    if (!user || user.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.json(user)
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
  getUserData
};
