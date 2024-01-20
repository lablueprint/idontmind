// This file and all of the Post related files are temporary and primarily used as examples
// Currently, they also act as a quick way to visually check for successful MongoDB connection.
const express = require('express');

const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.post('/createPost', postController.createPost);

postRouter.get('/fetchPosts', postController.getAllPosts);

module.exports = postRouter;
