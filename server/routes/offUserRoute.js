const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/offuserController');

userRouter.post('/createUser', userController.createUser);

userRouter.get('/getAllUsers', userController.getAllUsers);

module.exports = userRouter;
