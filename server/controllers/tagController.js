const Tag = require('../models/TagSchema');
const User = require('../models/OfficialUserSchema');

// Example of creating a document in the database
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.send(tags);
  } catch (err) {
    console.error(err);
  }
};

const getTagByName = async (req, res) => {
  try {
    const tag = await Tag.find({ name: req.body.name });
    res.send(tag);
  } catch (err) {
    console.error(err);
  }
};

// const getContentObjects = async (req, res) => {
//   try {
//     const tag = await Tag.find({ name: req.body.name });
//     res.send(tag);
//   } catch (err) {
//     console.error(err);
//   }
// };

// req has tag:  tagName, userName
const favoriteTag = async (req, res) => {
  try {
    const { tagName, username } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { favorites: tagName } },
    );
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};

const unfavoriteTag = async (req, res) => {
  try {
    const { tagName, username } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { favorites: tagName } },
    );
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};

const getFavorites = async (req, res) => {
  try {
    const { id } = req.body;
    const favorites = await User.find({ id }).select('favorites');

    res.send(favorites);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllTags, getTagByName, favoriteTag, unfavoriteTag, getFavorites,
};
