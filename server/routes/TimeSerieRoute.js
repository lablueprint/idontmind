const express = require('express');

const timeSerieRouter = express.Router();
const timeSerieController = require('../controllers/timeSerieController');

timeSerieRouter.post('/getAllTimeSeries', timeSerieController.getAllTimeSeries);

module.exports = timeSerieRouter;
