const jwt = require('jsonwebtoken');
const LoginUser = require('../models/UserSchema');
const passport = require('../passport');

// Example of creating a document in the database
const createUser = async (req, res) => {
  console.log('ran Create User');
  console.log(req.body);

  const test = new LoginUser(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// Creates user with given email and password to send to backend
const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new LoginUser({ email, password });
    await user.save();
    res.send('User created successfully');
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
      const token = jwt.sign({ id: user.id }, 'secret');

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

const authenticatePassport = passport.authenticate('jwt', { session: false });

module.exports = {
  createUser,
  signInUser,
  signUpUser,
  welcomeUser,
  authenticatePassport,
};
