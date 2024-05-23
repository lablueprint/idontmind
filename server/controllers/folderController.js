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
    if (user.favoritedFolders.has(folderName)) {
      return res.status(404).send({ message: 'Folder already exists' });
    }
    const newFolder = {
      tags: tags || [],
      resources: resources || [],
    };

    user.favoritedFolders.set(folderName, newFolder); // need to specify folderName
    await user.save();
    return res.send(user.favoritedFolders);
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

// add a tag or resource to a specified folder
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
    // only add a tag if it isn't already in folder
    if (tag && !folder.tags.includes(tag)) folder.tags.push(tag);
    // only add a resource if it isn't already in folder
    if (resource && !folder.resources.includes(resource)) folder.resources.push(resource);
    await user.save();
    return res.send(user.favoritedFolders);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// delete a specified tag or resource from a specified folder
const deleteFromFolder = async (req, res) => {
  console.log('delete from folder');
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

    if (tag) {
      folder.tags = folder.tags.filter((t) => t !== tag);
    }
    if (resource) {
      folder.resources = folder.resources.filter((r) => r !== resource);
    }

    await user.save();
    return res.send(user.favoritedFolders);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const deleteFavoritedFolder = async (req, res) => {
  console.log('delete favorited folder');
  const { id, folderName } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!user.favoritedFolders.has(folderName)) {
      return res.status(404).send({ message: 'Folder not found' });
    }

    user.favoritedFolders.delete(folderName);

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
  deleteFromFolder,
  deleteFavoritedFolder,
};
