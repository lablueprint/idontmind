const express = require('express');

const folderRouter = express.Router();
const folderController = require('../controllers/folderController');

folderRouter.post('/createFavoritedFolder', folderController.createFavoritedFolder);

folderRouter.post('/addToFolder', folderController.addToFolder);

folderRouter.get('/getFavoritedFolders', folderController.getFavoritedFolders);



module.exports = folderRouter;
