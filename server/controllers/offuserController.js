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

module.exports = {
  createUser, getAllUsers, getUserById, updateUser, deleteUserById, getFavorites,
};
