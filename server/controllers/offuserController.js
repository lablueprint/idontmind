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
      res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// create a user
const createUser = async (req, res) => {
  const test = new User(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// update user
const updateUser = async (req, res) => {
  const { id, updatedFields } = req.body;
  try {
    // find the existing user by its unique identifier (e.g., _id)
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(404).send({ message: 'User not found' });
    }
    // update the specified fields
    Object.assign(existingUser, updatedFields);
    // save the updated user
    const updatedUser = await existingUser.save();
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createUser, getAllUsers, getUserById, updateUser, deleteUserById,
};
