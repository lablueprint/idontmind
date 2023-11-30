const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/user', userController.createUser);

userRouter.get('/get', (req, res) => {
  res.send('Get API');
});

module.exports = userRouter;
