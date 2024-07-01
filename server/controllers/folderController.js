const User = require('../models/OfficialUserSchema');

const createFavoritedFolder = async (req, res) => {
  console.log('create favorited folder');
  const {
    id, folderName, description, tags, resources,
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
      description: description || '',
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
function sanitize(name) {
  return name.replace(/\./g, '_');
}
const addToFolder = async (req, res) => {
  console.log('add to folder');
  const {
    id, folderName, tag, resource,
  } = req.body;
  console.log(req.body);
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
    if (tag && !folder.tags.includes(tag)) {
      folder.tags.push(tag);
      // const favoritedTag = user.favoritedTags.get(tag);
      // favoritedTag.folders.push(folderName);
      const sanitizedTag = sanitize(tag);
      if (!user.tagToFolders.get(sanitizedTag)) {
        user.tagToFolders.set(sanitizedTag, [folderName]);
      } else {
        user.tagToFolders.get(sanitizedTag).push(folderName);
      }
    }
    // only add a resource if it isn't already in folder
    if (resource && !folder.resources.includes(resource)) {
      folder.resources.push(resource);
      const sanitizedResource = sanitize(resource);

      if (!user.resourceToFolders.get(sanitizedResource)) {
        user.resourceToFolders.set(sanitizedResource, [folderName]);
      } else {
        user.resourceToFolders.get(sanitizedResource).push(folderName);
      }
    }
    await user.save();
    return res.send(user.favoritedFolders);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const getFoldersForItem = async (req, res) => {
  console.log('get folders for item');
  const { id, tag, resource } = req.query;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (tag) return res.send(user.tagToFolders(sanitize(tag)));
    return res.send(user.tagToFolders(sanitize(resource)));
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

const getFoldersForTag = async (req, res) => {
  console.log('get folders for tag');
  const { id, tag } = req.query;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const foldersWithTag = [];
    user.favoritedFolders.forEach((value, key) => {
      if (value.tags.includes(tag)) {
        foldersWithTag.push(key);
      }
    });
    console.log(foldersWithTag);
    return res.status(200).json(foldersWithTag);
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
  getFoldersForTag,
};
