const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offuserController');

offUserRouter.post('/createUser', offUserController.createUser);

offUserRouter.get('/getUserById', offUserController.getUserById);

offUserRouter.get('/getAllUsers', offUserController.getAllUsers);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserById', offUserController.deleteUserById);

module.exports = offUserRouter;
