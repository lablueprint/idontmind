const CustomActivity = require('../models/CustomActivitySchema');

const addCustomActivity = async (req, res) => {
  const { email, activity, icon } = req.body;
  try {
    await CustomActivity.create({ email, activity, icon });
    res.status(201).send({ message: 'Custom activity added' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to add custom activity' });
  }
};

const getCustomActivities = async (req, res) => {
  const { email } = req.query;
  try {
    const customActivities = await CustomActivity.find({ email });
    res.status(200).send({ customActivities });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch custom activities' });
  }
};

const deleteCustomActivities = async (req, res) => {
  try {
    const { id } = req.params;
    await CustomActivity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Custom activity deleted successfully' });
  } catch (error) {
    console.error('Failed to delete custom activity:', error.message);
    res.status(500).json({ error: 'Failed to delete custom activity' });
  }
};

module.exports = {
  addCustomActivity,
  getCustomActivities,
  deleteCustomActivities,
};
