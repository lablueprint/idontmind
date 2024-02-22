const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offUserController');

offUserRouter.post('/createUser', offUserController.createUser);

offUserRouter.get('/getUserById', offUserController.getUserById);

offUserRouter.get('/getAllUsers', offUserController.getAllUsers);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserById', offUserController.deleteUserById);

offUserRouter.post('/sendEmail', offUserController.sendEmail);

offUserRouter.post('/checkUserByEmail', offUserController.checkUserByEmail);

offUserRouter.post('/resetPassword', offUserController.resetPassword);

module.exports = offUserRouter;
