const Test = require('../models/testModel');

const createTest = async (req, res) => {
  const test = new Test(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createTest,
};
