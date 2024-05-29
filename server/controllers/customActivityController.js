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

module.exports = {
  addCustomActivity,
  getCustomActivities,
};
