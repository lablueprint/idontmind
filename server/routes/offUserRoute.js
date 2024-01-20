const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/offUserController');

userRouter.post('/createUser', userController.createUser);

userRouter.get('/getAllUsers', userController.getAllUsers);

module.exports = userRouter;
