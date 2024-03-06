const express = require('express');

const testRouter = express.Router();
const testController = require('../controllers/testController');
const awsController = require('../controllers/awsController');

testRouter.post('/post', testController.createTest);

testRouter.get('/get', (req, res) => {
  res.send('Get API');
});

testRouter.get('/getImg', awsController.retrieveImage);

testRouter.post('/uploadImage', awsController.uploadImage);

module.exports = testRouter;
