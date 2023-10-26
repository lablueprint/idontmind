const express = require('express');

const testRouter = express.Router();
const testController = require('../controllers/testController');

testRouter.post('/post', testController.createTest);

testRouter.get('/get', (req, res) => {
  res.send('Get API');
});

module.exports = testRouter;
