const jwt = require('jsonwebtoken');
const User = require('../models/OfficialUserSchema');
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
  return null;
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

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

// Sample of returning given user information from backend
const getUserData = async (req, res) => {
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

// get all users in the database
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get a user by id
const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// create a user
const createUser = async (req, res) => {
  const test = new User(req.body);
  try {
    const data = await test.save(test);
    const validationError = data.validateSync();
    if (validationError) {
    // user data does not meet the schema requirements
      return res.status(400).send({ message: validationError.message });
    }
    return res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// update user
const updateUser = async (req, res) => {
  const { id, updatedFields } = req.body;
  try {
    // find the existing user by its unique identifier (e.g., _id)
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    // check if any restricted fields are present in updatedFields
    const restrictedFields = ['id'];
    const hasRestricted = Object.keys(updatedFields).some((f) => restrictedFields.includes(f));
    if (hasRestricted) {
      return res.status(403).send({ message: 'No permission to update certain fields' });
    }
    // update the specified fields
    Object.assign(existingUser, updatedFields);
    // save the updated user
    const updatedUser = await existingUser.save();
    return res.send(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const getFavorites = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.find({ username });
    res.send(user[0].favorites);
  } catch (err) {
    console.error(err);
  }
};

// get current user's challenge
const getUserChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const resetChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { ChallengeDay: 0 } });
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const increaseChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $inc: { ChallengeDay: 1 } });
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const readSpecifiedFields = async (req, res) => {
  const { id, fields } = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    const user = {};
    fields.forEach((field) => {
      if (existingUser[field] !== undefined) {
        user[field] = existingUser[field];
      }
    });
    return res.send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  signInUser,
  signUpUser,
  welcomeUser,
  authenticatePassport,
  getUserData,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
  getFavorites,
  getUserChallengeDay,
  resetChallengeDay,
  increaseChallengeDay,
  readSpecifiedFields,
};
