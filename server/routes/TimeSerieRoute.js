const express = require('express');

const timeSerieRouter = express.Router();
const timeSerieController = require('../controllers/timeSerieController');

timeSerieRouter.post('/getAllTimeSeries', timeSerieController.getAllTimeSeries);

timeSerieRouter.post('/InsertManyExamples', timeSerieController.InsertManyExamples);

timeSerieRouter.post('/getSleepTimeSeries', timeSerieController.getSleepTimeSeries);

module.exports = timeSerieRouter;
