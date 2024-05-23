const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offUserController');

offUserRouter.post('/signin', offUserController.signInUser);
offUserRouter.post('/signup', offUserController.signUpUser);

// Protects the routes below with middleware (requires authorization header aka signed in user)
offUserRouter.use(offUserController.authenticatePassport);
offUserRouter.post('/getData', offUserController.getUserData);

offUserRouter.get('/get', (req, res) => {
  res.send('Get API');
});
offUserRouter.get('/protected', offUserController.authenticatePassport, offUserController.welcomeUser);

offUserRouter.post('/createUser', offUserController.createUser);

offUserRouter.get('/getUserById', offUserController.getUserById);

offUserRouter.get('/getAllUsers', offUserController.getAllUsers);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserById', offUserController.deleteUserById);

offUserRouter.post('/getUserChallengeDay', offUserController.getUserChallengeDay);

offUserRouter.post('/resetChallengeDay', offUserController.resetChallengeDay);

offUserRouter.post('/increaseChallengeDay', offUserController.increaseChallengeDay);

offUserRouter.post('/readSpecifiedFields', offUserController.readSpecifiedFields);

// offUserRouter.post('/getFavorites', offUserController.getFavorites);

// offUserRouter.post('/favoriteTag', offUserController.favoriteTag);

// offUserRouter.post('/unfavoriteTag', offUserController.unfavoriteTag);

module.exports = offUserRouter;
