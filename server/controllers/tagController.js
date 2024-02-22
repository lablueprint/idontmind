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

// returns tag objects with just their id, tagName, and isFavorite fields
const getAllTagTitles = async (req, res) => {
  try {
    const tags = await Tag.find({}).select('tagName isFavorite');
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
    await User.findOneAndUpdate(
      { username },
      { $push: { favorites: tag } },
    );
    // find the corresponding tag document and update its isFavorite field
    const updatedTag = await Tag.findOneAndUpdate(
      { _id: tag.id },
      { $set: { isFavorite: true } }, // Toggle isFavorite
    );
    return res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const unfavoriteTag = async (req, res) => {
  try {
    const { tag, username } = req.body;
    await User.findOneAndUpdate(
      { username },
      { $pull: { favorites: tag } },
    );
    // find the corresponding tag document and update its isFavorite field
    const updatedTag = await Tag.findOneAndUpdate(
      { _id: tag.id },
      { $set: { isFavorite: false } }, // Toggle isFavorite
    );
    return res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
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

// get recommended tags based on user
const getRecommendedTags = async (req, res) => {
    const { username } = req.body;
    try {
      // grab existing user
      const existingUser = await User.findOne({username});

      if (!existingUser) {
        return res.status(404).send({ message: 'User not found'});
      }
      console.log(existingUser);
      console.log(existingUser.favorites);
      console.log(existingUser.banTags);

      const favoritesList = existingUser.favorites || [];
      const banList = existingUser.banTags || [];

      // combine favorites and bantag list
      const combinedList = favoritesList.concat(banList);

      // grabbing all tags that aren't in the combined list
      const tags = await Tag.find({ tagName : { $nin : combinedList.map(tag => tag.tagName) } });

      console.log(tags);
      
      res.send(tags);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
  }

module.exports = {
  getAllTags, getTagByName, favoriteTag, unfavoriteTag, getAllTagTitles, createTag, getRecommendedTags,
};