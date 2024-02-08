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
  const { tagName } = req.body;
  try {
    const tag = await Tag.findOne({ tagName });
    // send first tag object in list
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

// req has tag object, userName
const favoriteTag = async (req, res) => {
  try {
    const { tag, username } = req.body;
    console.log('HERERERJJ ', tag);
    const user = await User.findOne({ username });

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check if the tag already exists in the favorites array
    const tagExists = user.favorites.some((favorite) => favorite.id === tag.id);
    if (tagExists) {
      return res.status(400).json({ message: 'Tag already exists in favorites' });
    }

    // maybe add additional error checking for whether the requested tag id is valid?

    // if error checking passes, add the new tag to the favorites array
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { favorites: tag } },
      { new: true },
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const unfavoriteTag = async (req, res) => {
  try {
    const { tag, username } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { favorites: tag } },
    );
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};

// create a tag, requires a tag object with tagName
const createTag = async (req, res) => {
  const tag = new Tag(req.body);
  try {
    const data = await tag.save(tag);
    const validationError = data.validateSync();
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }
    return res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  getAllTags, getTagByName, favoriteTag, unfavoriteTag, getAllTagTitles, createTag,
};
