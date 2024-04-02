const express = require('express');

const searchRouter = express.Router();
const searchController = require('../controllers/searchController');

searchRouter.get('/get', (req, res) => {
  res.send('Get API');
});

searchRouter.post('/searchByKeyword', searchController.searchByKeyword);

searchRouter.post('/searchByTag', searchController.searchByTag);

module.exports = searchRouter;
