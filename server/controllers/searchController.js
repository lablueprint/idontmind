const Article = require('../models/ArticleSchema');
const QnA = require('../models/QnASchema');

// filter resources by keyword in title
const searchByKeyword = async (req, res) => {
  const { keyword, filter } = req.body;
  const aggregateCalls = [];

  if (filter === 'All' || filter === 'Articles') {
    aggregateCalls.push(Article.aggregate([{
      $match: {
        $or: [
          { Title: { $regex: keyword, $options: 'i' } },
          { Exerpts: { $elemMatch: { $regex: keyword, $options: 'i' } } },
        ],
      },
    }]));
  }
  if (filter === 'All' || filter === 'Q&A') {
    aggregateCalls.push(QnA.aggregate([{
      $match: {
        $or: [
          { Question: { $regex: keyword, $options: 'i' } },
          { Answer: { $regex: keyword, $options: 'i' } },
        ],
      },
    }]));
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

module.exports = {
  searchByKeyword, searchByTag,
};
