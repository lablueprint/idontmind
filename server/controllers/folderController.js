const User = require('../models/OfficialUserSchema');

function sanitize(name) {
  return name.replace(/\./g, '_');
}

const createFavoritedFolder = async (req, res) => {
  console.log('create favorited folder');
  const {
    id, folderName, description, tag, resource,
  } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (user.favoritedFolders.has(folderName)) {
      return res.status(404).send({ message: 'Folder already exists' });
    }
    let tags = [tag];
    if (!tag) tags = [];
    let resources = [resource];
    if (!resource) resources = [];

    const newFolder = {
      description: description || '',
      tags,
      resources,
    };

    user.favoritedFolders.set(folderName, newFolder); // need to specify folderName

    // create entry in tagToFolders or resourceToFolders
    if (tag) {
      const sanitizedTag = sanitize(tag);
      user.tagToFolders.set(sanitizedTag, [folderName]);
    }
    if (resource) {
      const sanitizedResource = sanitize(resource);
      user.resourceToFolders.set(sanitizedResource, [folderName]);
    }
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
  console.log(req.body);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!user.favoritedFolders.has(folderName)) {
      console.log('folder not found');
      return res.status(404).send({ message: 'Folder not found' });
    }
    const folder = user.favoritedFolders.get(folderName);

    // only add a tag if it isn't already in folder
    if (tag && !folder.tags.includes(tag)) {
      console.log('adding tag to folder');
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
    console.log(folder.resources);
    console.log(resource);
    if (resource && (folder.resources.length === 0 || !folder.resources.includes(resource))) {
      console.log('adding resource to folder');
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
    if (tag) return res.send(user.tagToFolders.get(sanitize(tag)));
    return res.send(user.resourceToFolders.get(sanitize(resource)));
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

      // also update tagToFolder
      const sanitizedTag = sanitize(tag);
      const tagFolders = user.tagToFolders.get(sanitizedTag) || [];
      user.tagToFolders.set(
        sanitizedTag,
        tagFolders.filter((f) => f !== folderName),
      );

      // If the tag has no more folders, remove it from the mapping
      if (user.tagToFolders.get(sanitizedTag).length === 0) {
        user.tagToFolders.delete(sanitizedTag);
      }
    }
    if (resource) {
      folder.resources = folder.resources.filter((r) => r !== resource);

      // also update resourceToFolder

      const sanitizedResource = sanitize(resource);
      const resourceFolders = user.resourceToFolders.get(sanitizedResource) || [];
      user.resourceToFolders.set(
        sanitizedResource,
        resourceFolders.filter((f) => f !== folderName),
      );

      // If the resource has no more folders, remove it from the mapping
      if (user.resourceToFolders.get(sanitizedResource).length === 0) {
        user.resourceToFolders.delete(sanitizedResource);
      }
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

// const getFoldersForTag = async (req, res) => {
//   console.log('get folders for tag');
//   const { id, tag } = req.query;
//   console.log(id);
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     const foldersWithTag = [];
//     user.favoritedFolders.forEach((value, key) => {
//       if (value.tags.includes(tag)) {
//         foldersWithTag.push(key);
//       }
//     });
//     console.log(foldersWithTag);
//     return res.status(200).json(foldersWithTag);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send(err);
//   }
// };

module.exports = {
  createFavoritedFolder,
  getFavoritedFolders,
  addToFolder,
  deleteFromFolder,
  deleteFavoritedFolder,
  getFoldersForItem,
};
