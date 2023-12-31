const express = require('express');

const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.post('/createPost', postController.createPost);

postRouter.get('/fetchPosts', postController.getAllPosts);

module.exports = postRouter;
