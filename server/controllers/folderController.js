const User = require('../models/OfficialUserSchema');

const createFavoritedFolder = async (req, res) => {
  console.log('create favorited folder');
  const {
    id, folderName, tags, resources,
  } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const newFolder = {
      tags: tags || [],
      resources: resources || [],
    };

    user.favoritedFolders.set(folderName, newFolder); // need to specify folderName
    await user.save();
    return res.send({ favoritedFolders: user.favoritedFolders });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const getFavoritedFolders = async (req, res) => {
  console.log('get favorited folders');
  const { id } = req.query;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send(user.favoritedFolders);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const addToFolder = async (req, res) => {
  console.log('add to folder');
  const {
    id, folderName, tag, resource,
  } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!user.favoritedFolders.has(folderName)) {
      return res.status(404).send({ message: 'Folder not found' });
    }
    const folder = user.favoritedFolders.get(folderName);
    console.log(folder);
    folder.tags.push(tag);
    folder.resources.push(resource);
    await user.save();
    return res.send(user.favoritedFolders);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};



module.exports = {
  createFavoritedFolder,
  getFavoritedFolders,
  addToFolder,
};
