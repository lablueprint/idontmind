const Journal = require('../models/JournalSchema');

const createJournal = async (req, res) => {
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

// update journal entry
const updateJournal = async (req, res) => {
  const { id, updatedFields } = req.body;
  try {
    // find the existing journal by its unique identifier (e.g., _id)
    const existingJournal = await Journal.findById(id);
    if (!existingJournal) {
      res.status(404).send({ message: 'Journal not found' });
    }
    // update the specified fields
    Object.assign(existingJournal, updatedFields);
    // save the updated journal
    const updatedJournal = await existingJournal.save();
    res.send(updatedJournal);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// delete journal by id
const deleteJournalById = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedJournal = await Journal.findByIdAndRemove(id);
    if (!deletedJournal) {
      res.status(404).send({ message: 'Journal not found' });
    }
    res.send({ message: 'Journal deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  createJournal, getAllJournals, updateJournal, deleteJournalById,
};
