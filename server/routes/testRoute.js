const express = require('express');

const miscRouter = express.Router();
const searchController = require('../controllers/searchController');

const awsController = require('../controllers/awsController');

miscRouter.get('/get', (req, res) => {
  res.send('Get API');
});

miscRouter.post('/searchByKeyword', searchController.searchByKeyword);

miscRouter.post('/searchByTag', searchController.searchByTag);

miscRouter.get('/getImage', awsController.getImage);

miscRouter.post('/uploadImage', awsController.uploadImage);

module.exports = miscRouter;
