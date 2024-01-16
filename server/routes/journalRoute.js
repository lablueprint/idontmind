const express = require('express');

const journalRouter = express.Router();
const journalController = require('../controllers/journalController');

journalRouter.post('/createJournal', journalController.createJournal);

journalRouter.get('/getAllJournals', journalController.getAllJournals);

module.exports = journalRouter;
