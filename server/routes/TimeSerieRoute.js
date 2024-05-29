const express = require('express');

const timeSerieRouter = express.Router();
const timeSerieController = require('../controllers/timeSerieController');
const { addCustomActivity, getCustomActivities } = require('../controllers/customActivityController');

timeSerieRouter.post('/insertTimeSeries', timeSerieController.insertTimeSeries);

timeSerieRouter.post('/InsertManyExamples', timeSerieController.InsertManyExamples);

timeSerieRouter.post('/getUserTimeSeries', timeSerieController.getUserTimeSeries);

timeSerieRouter.post('/addCustomActivity', addCustomActivity);

timeSerieRouter.get('/getCustomActivities', getCustomActivities);

module.exports = timeSerieRouter;
