const Article = require('../models/ArticleSchema');
const Prompt = require('../models/PromptSchema');
const QnA = require('../models/QnASchema');

// filter resources by keyword in title
const searchByKeyword = async (req, res) => {
  const { keyword, filter } = req.body;
  const aggregateCalls = [];

  if (filter === 'All' || filter === 'Articles') {
    aggregateCalls.push(Article.aggregate([{ $match: { Title: { $regex: keyword, $options: 'i' } } }]));
  }
  if (filter === 'All' || filter === 'Prompts') {
    aggregateCalls.push(Prompt.aggregate([{ $match: { 'Journal Prompts': { $regex: keyword, $options: 'i' } } }]));
  }
  if (filter === 'All' || filter === 'Q&A') {
    aggregateCalls.push(QnA.aggregate([{ $match: { Question: { $regex: keyword, $options: 'i' } } }]));
  }

  try {
    const data = await Promise.all(aggregateCalls);
    res.send(data.flat());
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// filter resources by tag
const searchByTag = async (req, res) => {
  const { tag, filter } = req.body;
  const tagSearch = tag.toLowerCase();
  const aggregateCalls = [];

  if (filter === 'All' || filter === 'Articles') {
    aggregateCalls.push(
      Article.aggregate([{ $match: { Tags: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  if (filter === 'All' || filter === 'Prompts') {
    aggregateCalls.push(
      Prompt.aggregate([{ $match: { Tag: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  if (filter === 'All' || filter === 'Q&A') {
    aggregateCalls.push(
      QnA.aggregate([{ $match: { Tags: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  try {
    const data = await Promise.all(aggregateCalls);
    res.send(data.flat());
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// batched data

module.exports = {
  searchByKeyword, searchByTag,
};
