// This file and all of the Post related files are temporary and primarily used as examples
// Currently, they also act as a quick way to visually check for successful MongoDB connection.
const Post = require('../models/PostSchema');

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
  createPost, getAllPosts,
};
