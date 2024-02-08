const express = require('express');

const tagRouter = express.Router();
const tagController = require('../controllers/tagController');

tagRouter.get('/getAllTags', tagController.getAllTags);

tagRouter.post('/getTagByName', tagController.getTagByName);

tagRouter.post('/favoriteTag', tagController.favoriteTag);

tagRouter.post('/unfavoriteTag', tagController.unfavoriteTag);

tagRouter.post('/getFavorites', tagController.getFavorites);

module.exports = tagRouter;
