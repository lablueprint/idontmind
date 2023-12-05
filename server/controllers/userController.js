const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const passport = require('../passport');

// Example of creating a document in the database
const createUser = async (req, res) => {
  console.log('ran Create User');
  console.log(req.body);

  const test = new User(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    next(error);
  }
};

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

// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await User.find({});
//     res.send(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };

module.exports = {
  createUser,
  signInUser,
  signUpUser,
  welcomeUser,
};
