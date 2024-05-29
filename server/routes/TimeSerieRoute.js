const express = require('express');

const timeSerieRouter = express.Router();
const timeSerieController = require('../controllers/timeSerieController');

timeSerieRouter.post('/insertTimeSeries', timeSerieController.insertTimeSeries);

timeSerieRouter.post('/InsertManyExamples', timeSerieController.InsertManyExamples);

timeSerieRouter.post('/getUserTimeSeries', timeSerieController.getUserTimeSeries);

module.exports = timeSerieRouter;
