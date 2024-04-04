const User = require('../models/OfficialUserSchema');

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
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.send(user);
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

module.exports = {
  readSpecifiedFields,
  getFavorites,
  getUserChallengeDay,
  resetChallengeDay,
  increaseChallengeDay,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
