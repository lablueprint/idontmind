const User = require('../models/OfficialUserSchema');

const createUser = async (req, res) => {
  console.log('ran Create User');
  const test = new User(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createUser, getAllUsers,
};
