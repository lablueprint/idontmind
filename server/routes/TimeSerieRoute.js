const express = require('express');

const timeSerieRouter = express.Router();
const timeSerieController = require('../controllers/timeSerieController');
const { addCustomActivity, getCustomActivities, deleteCustomActivities } = require('../controllers/customActivityController');

timeSerieRouter.post('/insertTimeSeries', timeSerieController.insertTimeSeries);

timeSerieRouter.get('/checkExistingCheckIn', timeSerieController.checkExistingCheckIn);

timeSerieRouter.post('/InsertManyExamples', timeSerieController.InsertManyExamples);

timeSerieRouter.post('/findLastDays', timeSerieController.findLastDays);

timeSerieRouter.post('/getUserTimeSeries', timeSerieController.getUserTimeSeries);

timeSerieRouter.post('/addCustomActivity', addCustomActivity);

timeSerieRouter.get('/getCustomActivities', getCustomActivities);

timeSerieRouter.delete('/deleteCustomActivity/:id', deleteCustomActivities);

module.exports = timeSerieRouter;
