const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jsonData = require('../content_library.json');
const User = require('../models/OfficialUserSchema');
const passport = require('../passport');
const OfficialArticle = require('../models/OfficialArticleSchema');
const OfficialQnA = require('../models/OfficialQnASchema');
const OfficialPersonalStory = require('../models/OfficialStoriesSchema');
// Creates user with given email, password, and to send to backend
const signUpUser = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).send({ message: 'This user already has an account' });
    }

    const user = new User({ email, password, firstName });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
  return null;
};

// Signs in User and gives state id to differentiate user in backend
const signInUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user,
      });
    }

    req.login(user, { session: false }, (loginErr) => {
      if (loginErr) return next(loginErr);

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, 'secret');

      return res.json({ user, token });
    });
  })(req, res, next);
};

const welcomeUser = (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
};

// Sample of returning given user information from backend
const getUserData = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    if (!user || user.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const authenticatePassport = passport.authenticate('jwt', { session: false });

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
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.send(user);
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
  console.log('get favorites');
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const favoritesData = {
      bannedTags: user.banTags,
      favoritedTags: user.favoritedTags,
      favoritedResources: user.favoritedResources,
      favoritedFolders: Object.fromEntries(user.favoritedFolders),
    };

    return res.send(favoritesData);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const favoriteTag = async (req, res) => {
  console.log('favorite tag');
  const { tagName, id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!user.favoritedTags.includes(tagName)) user.favoritedTags.push(tagName);
    await user.save();

    return res.status(200).send(user.favoritedTags);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

function sanitize(name) {
  return name.replace(/\./g, '_');
}
const unfavoriteTag = async (req, res) => {
  console.log('unfavorite tag');
  const { tagName, id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.favoritedTags = user.favoritedTags.filter((t) => t !== tagName);

    // also remove from all favoritedFolders it is in
    const sanitizedTag = sanitize(tagName);

    const folderNames = user.tagToFolders.get(sanitizedTag);

    // also remove from all favoritedFolders it is in
    if (folderNames) {
      folderNames.forEach((folderName) => {
        const newTags = user.favoritedFolders.get(folderName).tags.filter(
          (t) => t !== tagName,
        );
        user.favoritedFolders.get(folderName).tags = newTags;
      });
    }

    // also delete entry from tagToFolders
    if (user.tagToFolders.has(sanitizedTag)) {
      user.tagToFolders.delete(sanitizedTag);
    }

    await user.save();

    return res.status(200).send(user.favoritedTags);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const favoriteResource = async (req, res) => {
  console.log('favorite resource');
  const { id, resource } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // only add to favoriteResources if not already there
    if (!user.favoritedResources.includes(resource)) user.favoritedResources.push(resource);
    await user.save();

    return res.send(user.favoritedResources);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const unfavoriteResource = async (req, res) => {
  console.log('unfavorite resource');
  const { id, resource } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.favoritedResources = user.favoritedResources.filter((r) => r !== resource);

    // also remove from all favoritedFolders it is in
    const sanitizedResource = sanitize(resource);

    const folderNames = user.resourceToFolders.get(sanitizedResource);

    if (folderNames) {
      folderNames.forEach((folderName) => {
        const newResources = user.favoritedFolders.get(folderName).resources.filter(
          (r) => r !== resource,
        );
        user.favoritedFolders.get(folderName).resources = newResources;
      });
    }

    // also delete entry from resourceToFolders
    if (user.resourceToFolders.has(sanitizedResource)) {
      user.resourceToFolders.delete(sanitizedResource);
    }

    // TODO: also remove from all favoritedFolders it is in

    await user.save();

    return res.send(user.favoritedResources);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const readSpecifiedFields = async (req, res) => {
  console.log('HERE');
  const { id, fields } = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    const user = {};
    fields.forEach((field) => {
      if (existingUser[field] !== undefined) {
        user[field] = existingUser[field];
      }
    });
    return res.send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// const getFavorites = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       // If user does not exist, send back an empty array
//       return res.status(404).json({ message: 'User not found', favorites: [] });
//     }
//     res.send(user.favorites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// get current user's challenge
const getUserChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const resetChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { ChallengeDay: 0 } });
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const increaseChallengeDay = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $inc: { ChallengeDay: 1 } });
    return res.send({ ChallengeDay: user.ChallengeDay });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }a;
};

// req has tag object, email
// const favoriteTag = async (req, res) => {
//   try {
//     const { tag, email } = req.body;
//     const user = await User.findOne({ email });
//     // check if user exists
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // check if the tag already exists in the favorites array
//     const tagExists = user.favorites.some((favorite) => favorite.id === tag.id);
//     if (tagExists) {
//       return res.status(400).json({ message: 'Tag already exists in favorites' });
//     }

//     // maybe add additional error checking for whether the requested tag id is valid?

//     // if error checking passes, add the new tag to the favorites array
//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { $push: { favorites: tag } },
//     );
//     return res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const unfavoriteTag = async (req, res) => {
//   try {
//     const { tag, email } = req.body;
//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { $pull: { favorites: tag } },
//     );
//     return res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

const sendEmail = async (req, res) => {
  console.log(33, req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL,
    to: req.body.email,
    subject: 'Password Reset Token',
    text: `Your password reset token is: ${req.body.token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.send(true);
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const checkUserByEmail = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.error('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user: existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const userID = req.body.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate(userID, { password: hashedPassword });
    console.log('User updated');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Password reset successfully', success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getRecommendedTags = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const combinedList = [].concat(user.favoritedTags, user.banTags);

    let tags = Object.keys(jsonData);
    // filter out favorited and banned tags
    tags = tags.filter((tag) => !combinedList.includes(tag));
    // map to individual objects with priority property
    tags = tags.map((tag) => {
      if (user.interestedTags.includes(tag) && !user.seenTags.includes(tag)) {
        return ({
          tagName: tag,
          priority: 2,
        });
      } if (user.seenTags.includes(tag)) {
        return ({
          tagName: tag,
          priority: 0,
        });
      }
      return ({
        tagName: tag,
        priority: 1,
      });
    });

    // randomize array of tags
    let currentIndex = tags.length;

    while (currentIndex !== 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [tags[currentIndex], tags[randomIndex]] = [
        tags[randomIndex], tags[currentIndex]];
    }
    // sort by priority
    tags.sort((a, b) => b.priority - a.priority);
    tags = tags.map((tag) => tag.tagName);
    console.log(tags);
    return res.send(tags.slice(0, 10));
    // update priority of tags
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getRecommendedResources = async (req, res) => {
  console.log('get recommended resources');
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const combinedList = [].concat(user.favoritedTags, user.banTags);

    let resources = [].concat(
      await OfficialArticle.find({ tags: { $nin: combinedList.map((tag) => tag) } }),
      await OfficialQnA.find({ tags: { $nin: combinedList.map((tag) => tag) } }),
      await OfficialPersonalStory.find({ tags: { $nin: combinedList.map((tag) => tag) } }),
    );

    // map to individual objects with priority property
    resources = resources.map((resource) => {
      let priority = 0;
      resource.tags.forEach((tag) => {
        if (user.interestedTags.includes(tag) && !user.seenTags.includes(tag)) {
          priority += 1;
        } else if (user.seenTags.includes(tag)) {
          priority -= 1;
        }
      });
      return ({
        resource,
        priority,
      });
    });
    // randomize array of tags
    let currentIndex = resources.length;

    while (currentIndex !== 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [resources[currentIndex], resources[randomIndex]] = [
        resources[randomIndex], resources[currentIndex]];
    }
    // sort by priority
    resources.sort((a, b) => b.priority - a.priority);

    console.log(resources.slice(0, 4));
    return res.send(resources.slice(0, 4));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  signInUser,
  signUpUser,
  welcomeUser,
  authenticatePassport,
  getUserData,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  readSpecifiedFields,
  deleteUserById,
  getFavorites,
  favoriteTag,
  unfavoriteTag,
  favoriteResource,
  unfavoriteResource,
  getUserChallengeDay,
  resetChallengeDay,
  increaseChallengeDay,
  checkUserByEmail,
  sendEmail,
  resetPassword,
  getRecommendedResources,
  getRecommendedTags,
};
