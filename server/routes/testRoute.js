const express = require('express');

const testRouter = express.Router();
const testController = require('../controllers/testController');

testRouter.post('/post', testController.createTest);

testRouter.get('/get', (req, res) => {
  res.send('Get API');
});

testRouter.post('/searchByKeyword', testController.searchByKeyword);

testRouter.post('/searchByTag', testController.searchByTag);

module.exports = testRouter;
