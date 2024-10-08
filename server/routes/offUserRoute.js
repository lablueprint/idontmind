const express = require('express');

const offUserRouter = express.Router();
const offUserController = require('../controllers/offUserController');

offUserRouter.post('/signin', offUserController.signInUser);
offUserRouter.post('/signup', offUserController.signUpUser);
offUserRouter.post('/setPersonalInfo', offUserController.setPersonalInfo);
offUserRouter.post('/setInterestedTags', offUserController.setInterestedTags);
offUserRouter.post('/setBanTags', offUserController.setBanTags);

offUserRouter.post('/sendEmail', offUserController.sendEmail);

offUserRouter.post('/checkUserByEmail', offUserController.checkUserByEmail);

// !!! TODO: this should be changed to be semi protected
offUserRouter.post('/resetPassword', offUserController.resetPassword);

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

offUserRouter.get('/getFavorites', offUserController.getFavorites);

offUserRouter.post('/updateUser', offUserController.updateUser);

offUserRouter.post('/deleteUserById', offUserController.deleteUserById);

offUserRouter.post('/getUserChallengeDay', offUserController.getUserChallengeDay);

offUserRouter.post('/resetChallengeDay', offUserController.resetChallengeDay);

offUserRouter.post('/increaseChallengeDay', offUserController.increaseChallengeDay);

offUserRouter.post('/readSpecifiedFields', offUserController.readSpecifiedFields);

offUserRouter.post('/favoriteTag', offUserController.favoriteTag);

offUserRouter.post('/unfavoriteTag', offUserController.unfavoriteTag);

offUserRouter.post('/favoriteResource', offUserController.favoriteResource);

offUserRouter.post('/unfavoriteResource', offUserController.unfavoriteResource);

offUserRouter.post('/getRecommendedResources', offUserController.getRecommendedResources);

offUserRouter.post('/getRecommendedTags', offUserController.getRecommendedTags);

module.exports = offUserRouter;
