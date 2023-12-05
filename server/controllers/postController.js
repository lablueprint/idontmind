const Post = require('../models/PostSchema');
const User = require('../models/UserSchema');

const getRandomTimestamp = () => {
  // Generate a random timestamp between January 1, 2023, and December 4, 2023
  const startTimestamp = new Date('2023-01-01').getTime();
  const endTimestamp = new Date('2023-12-04').getTime();
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  return new Date(randomTimestamp);
};

// Function to populate database with random users
const createUsers = async (req, res) => {
  const allUsers = [];
  try {
    console.log('ran create users');
    const numUsers = req.body.amount;
    const userPromises = [];

    for (let i = 0; i < numUsers; i += 1) {
      const user = {
        timestamp: getRandomTimestamp(),
        username: `user${i}`,
        number: Math.floor(Math.random() * 200),
      };

      const newUser = new User(user);
      const savePromise = newUser.save(newUser);
      userPromises.push(savePromise);
    }

    const savedUsers = await Promise.all(userPromises);

    allUsers.push(...savedUsers);
    res.send(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Example of creating a document in the database
const createPost = async (req, res) => {
  console.log('ran Create Post');
  const currentdate = new Date();
  req.body.timestamp = currentdate;
  console.log(req.body.timestamp);

  const test = new Post(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createPost, getAllPosts, createUsers,
};
