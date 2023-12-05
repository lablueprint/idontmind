const express = require('express');
const passport = require('../passport'); // remove this when moved to userController

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/createUser', userController.createUser);
userRouter.post('/signin', userController.signInUser);
userRouter.post('/signup', userController.signUpUser);

userRouter.get('/get', (req, res) => {
  res.send('Get API');
});
userRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
}); // declare functions in userController for second and third parameters

module.exports = userRouter;
