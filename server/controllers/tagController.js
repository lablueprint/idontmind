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

const getAllTagTitles = async (req, res) => {
  try {
    const tags = await Tag.find({}).select('tagName');
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
    const favorites = await User.findById(id).select('-_id favorites');

    res.send(favorites);
  } catch (err) {
    console.error(err);
  }
};

// create a user
const createTag = async (req, res) => {
  const tag = new Tag(req.body);
  try {
    const data = await tag.save(tag);
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

module.exports = {
  getAllTags, getTagByName, favoriteTag, unfavoriteTag, getFavorites, getAllTagTitles, createTag,
};
