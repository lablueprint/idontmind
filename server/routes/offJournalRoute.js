const express = require('express');

const offJournalRouter = express.Router();
const offJournalController = require('../controllers/offJournalController');

offJournalRouter.post('/createJournal', offJournalController.createJournal);

offJournalRouter.get('/getAllJournals', offJournalController.getAllJournals);

offJournalRouter.post('/getJournalByEmail', offJournalController.getJournalByEmail);

offJournalRouter.post('/updateJournal', offJournalController.updateJournal);

offJournalRouter.post('/deleteJournalById', offJournalController.deleteJournalById);

module.exports = offJournalRouter;
