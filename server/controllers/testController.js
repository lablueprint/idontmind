const Test = require('../models/testSchema');
const Article = require('../models/ArticleSchema');
const Prompt = require('../models/PromptSchema');
const QnA = require('../models/QnASchema');

// Example of creating a document in the database
const createTest = async (req, res) => {
  const test = new Test(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

// filter resources by keyword in title
const searchByKeyword = async (req, res) => {
  const { keyword } = req.body;
  const aggregateCalls = [
    Article.aggregate([{ $match: { Title: { $regex: keyword, $options: 'i' } } }]),
    Prompt.aggregate([{ $match: { 'Journal Prompts': { $regex: keyword, $options: 'i' } } }]),
    QnA.aggregate([{ $match: { Question: { $regex: keyword, $options: 'i' } } }]),
  ];
  try {
    const data = await Promise.all(aggregateCalls);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// filter resources by tag
const searchByTag = async (req, res) => {
  const { tag } = req.body;
  const aggregateCalls = [
    Article.aggregate([{
      $match: {
        Tags: {
          $elemMatch: { $in: [tag] },
        },
      },
    }]),
    Prompt.aggregate([{
      $match: {
        Tag: {
          $elemMatch: { $in: [tag] },
        },
      },
    }]),
    QnA.aggregate([{
      $match: {
        Tags: {
          $elemMatch: { $in: [tag] },
        },
      },
    }]),
  ];
  try {
    const data = await Promise.all(aggregateCalls);
    res.send(data); // [0] = Article, [1] = Prompt, etc.
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// batched data

module.exports = {
  createTest, searchByKeyword, searchByTag,
};
