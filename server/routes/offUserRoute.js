const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offUserController');

offUserRouter.post('/createUser', offUserController.createUser);

offUserRouter.get('/getUserByID', offUserController.getUserByID);

offUserRouter.get('/getAllUsers', offUserController.getAllUsers);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserByID', offUserController.deleteUserByID);

module.exports = offUserRouter;
