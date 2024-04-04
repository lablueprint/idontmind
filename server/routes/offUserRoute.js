const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offUserController');

offUserRouter.post('/createUser', offUserController.createUser);

offUserRouter.get('/getUserById', offUserController.getUserById);

offUserRouter.get('/getAllUsers', offUserController.getAllUsers);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserById', offUserController.deleteUserById);

offUserRouter.post('/readSpecifiedFields', offUserController.readSpecifiedFields);

offUserRouter.post('/getFavorites', offUserController.getFavorites);

offUserRouter.post('/getUserChallengeDay', offUserController.getUserChallengeDay);

offUserRouter.post('/resetChallengeDay', offUserController.resetChallengeDay);

offUserRouter.post('/increaseChallengeDay', offUserController.increaseChallengeDay);

module.exports = offUserRouter;
