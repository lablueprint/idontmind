const Content = require('../models/ContentSchema');
const Article = require('../models/ArticleSchema');

// get all content objects
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find({});
    res.send(contents);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.send(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get all prompts
const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Article.find({});
    res.send(prompts);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get all Q&A's
const getAllQnAs = async (req, res) => {
  try {
    const qnas = await Article.find({});
    res.send(qnas);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllContent, getAllArticles, getAllPrompts, getAllQnAs,
};
