const Journal = require('../models/JournalSchema');

const createJournal = async (req, res) => {
  console.log('ran Create Journal');

  const test = new Journal(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find({});
    res.send(journals);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createJournal, getAllJournals,
};
