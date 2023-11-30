const User = require('../models/UserSchema');

// Example of creating a document in the database
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
};
