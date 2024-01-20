const express = require('express');

const contentRouter = express.Router();
const contentController = require('../controllers/contentController');

contentRouter.get('/getAllContent', contentController.getAllContent);
contentRouter.get('/getAllArticles', contentController.getAllArticles);
contentRouter.get('/getAllPrompts', contentController.getAllPrompts);
contentRouter.get('/getAllQnas', contentController.getAllQnAs);

module.exports = contentRouter;
