const jwt = require('jsonwebtoken');
const User = require('../models/OfficialUserSchema');
const passport = require('../passport');

// Creates user with given email, password, and to send to backend
const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).send({ message: 'This user already has an account' });
    }

    const user = new User({ email, password });
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

const setPersonalInfo = async (req, res) => {
  const {
    email, firstName, age, country, gender,
  } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, {
      firstName, age, country, gender,
    });
    res.send(user);
  } catch (e) {
    console.error(e);
  }
};

const setInterestedTags = async (req, res) => {
  const { email, interestedTags } = req.body;
  console.log(email);
  console.log(interestedTags);
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { InterestedTags: interestedTags } },
    );
    console.log(user);
    res.send(user);
  } catch (e) {
    console.error(e);
  }
};

const setBanTags = async (req, res) => {
  const { email, banTags } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { $set: { banTags } });
    res.send(user);
  } catch (e) {
    console.error(e);
  }
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
  }
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
  // getFavorites,
  getUserChallengeDay,
  resetChallengeDay,
  increaseChallengeDay,
  // favoriteTag,
  // unfavoriteTag,
  setPersonalInfo,
  setInterestedTags,
  setBanTags,
};
