const express = require('express');

const tagRouter = express.Router();
const tagController = require('../controllers/tagController');

tagRouter.get('/getAllTags', tagController.getAllTags);

tagRouter.post('/getTagByName', tagController.getTagByName);

tagRouter.post('/favoriteTag', tagController.favoriteTag);

tagRouter.post('/unfavoriteTag', tagController.unfavoriteTag);

tagRouter.post('/getAllTagTitles', tagController.getAllTagTitles);

tagRouter.post('/createTag', tagController.createTag);

module.exports = tagRouter;
