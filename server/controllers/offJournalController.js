const Journal = require('../models/OfficialJournalSchema');

const createJournal = async (req, res) => {
  const test = new Journal(req.body);
  try {
    const data = await test.save(test);
    const validationError = data.validateSync();
    if (validationError) {
    // journal data does not meet the schema requirements
      return res.status(400).send({ message: validationError.message });
    }
    return res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// get all journals (prolly only use for testing ?)
const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find({});
    res.send(journals);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get journal by username (user who wrote it)
const getJournalByUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const journal = await Journal.find({ username });
    if (!journal) {
      return res.status(404).send({ message: 'Journal not found' });
    }
    res.send(journal);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
  return null;
};

// update journal entry, provide journal id + an object containing updated fields
const updateJournal = async (req, res) => {
  const { id, updatedFields } = req.body;
  try {
    // find the existing journal by its unique identifier (e.g., _id)
    const existingJournal = await Journal.findById(id);
    if (!existingJournal) {
      res.status(404).send({ message: 'Journal not found' });
    }
    // check if any restricted fields are present in updatedFields
    const restrictedFields = ['timestamp', 'id'];
    const hasRestricted = Object.keys(updatedFields).some((f) => restrictedFields.includes(f));
    if (hasRestricted) {
      return res.status(403).send({ message: 'No permission to update certain fields' });
    }
    // update the specified fields
    Object.assign(existingJournal, { modifiedTime: new Date(), ...updatedFields });
    // save the updated journal
    const updatedJournal = await existingJournal.save();
    return res.send(updatedJournal);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  return null;
};

// delete journal by id
const deleteJournalById = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedJournal = await Journal.findByIdAndRemove(id);
    if (!deletedJournal) {
      return res.status(404).send({ message: 'Journal not found' });
    }
    res.send({ message: 'Journal deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
  return null;
};

module.exports = {
  createJournal, getAllJournals, getJournalByUsername, updateJournal, deleteJournalById,
};
