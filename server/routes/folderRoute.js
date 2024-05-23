const express = require('express');

const folderRouter = express.Router();
const folderController = require('../controllers/folderController');
const offUserController = require('../controllers/offUserController');

folderRouter.use(offUserController.authenticatePassport);

folderRouter.post('/createFavoritedFolder', folderController.createFavoritedFolder);

folderRouter.post('/addToFolder', folderController.addToFolder);

folderRouter.post('/deleteFromFolder', folderController.deleteFromFolder);

folderRouter.post('/deleteFavoritedFolder', folderController.deleteFavoritedFolder);

folderRouter.get('/getFavoritedFolders', folderController.getFavoritedFolders);

module.exports = folderRouter;
