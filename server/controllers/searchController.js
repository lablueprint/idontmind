const Article = require('../models/ArticleSchema');
const QnA = require('../models/QnASchema');

const OfficialArticle = require('../models/OfficialArticleSchema');
const OfficialQnA = require('../models/OfficialQnASchema');
const OfficialPersonalStory = require('../models/OfficialStoriesSchema');
const OfficialExercise = require('../models/OfficialExerciseSchema');

// filter resources by keyword in title
const searchByKeyword = async (req, res) => {
  const { keyword, filter } = req.body;
  const aggregateCalls = [];

  if (filter === 'All' || filter === 'Articles') {
    aggregateCalls.push(OfficialArticle.aggregate([{
      $match: {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { excerpts: { $elemMatch: { $regex: keyword, $options: 'i' } } },
        ],
      },
    }]));
  }
  if (filter === 'All' || filter === 'Q&A') {
    aggregateCalls.push(OfficialQnA.aggregate([{
      $match: {
        $or: [
          { question: { $regex: keyword, $options: 'i' } },
          { answer: { $regex: keyword, $options: 'i' } },
        ],
      },
    }]));
  }
  if (filter === 'All' || filter === 'Personal Stories') {
    aggregateCalls.push(OfficialPersonalStory.aggregate([{
      $match: {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { excerpts: { $elemMatch: { $regex: keyword, $options: 'i' } } },
        ],
      },
    }]));
  }
  if (filter === 'All' || filter === 'Exercises') {
    aggregateCalls.push(OfficialExercise.aggregate([{
      $match: {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { excerpts: { $elemMatch: { $regex: keyword, $options: 'i' } } },
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
      OfficialArticle.aggregate([{ $match: { tags: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  if (filter === 'All' || filter === 'Q&A') {
    aggregateCalls.push(
      OfficialQnA.aggregate([{ $match: { tags: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  if (filter === 'All' || filter === 'Personal Stories') {
    aggregateCalls.push(
      OfficialPersonalStory.aggregate([{ $match: { tags: { $elemMatch: { $in: [tagSearch] } } } }]),
    );
  }

  if (filter === 'All' || filter === 'Exercises') {
    aggregateCalls.push(
      OfficialExercise.aggregate([{ $match: { tags: { $elemMatch: { $in: [tagSearch] } } } }]),
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
