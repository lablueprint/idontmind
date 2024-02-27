const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/signin', userController.signInUser);
userRouter.post('/signup', userController.signUpUser);

// Protects the routes below with middleware (requires authorization header aka signed in user)
userRouter.use(userController.authenticatePassport); 
userRouter.post('/getData', userController.getUserData);

userRouter.get('/get', (req, res) => {
  res.send('Get API');
});
userRouter.get('/protected', userController.authenticatePassport, userController.welcomeUser);

module.exports = userRouter;
