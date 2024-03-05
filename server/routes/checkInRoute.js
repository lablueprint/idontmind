const express = require('express');

const checkInRouter = express.Router();
const checkInController = require('../controllers/checkInController');

checkInRouter.post('/createCheckIn', checkInController.createCheckIn);

module.exports = checkInRouter;
