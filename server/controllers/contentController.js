// these are all read functions!
const Content = require('../models/ContentSchema');
const Article = require('../models/ArticleSchema');
const Prompt = require('../models/PromptSchema');
const QnA = require('../models/QnASchema');

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
    const prompts = await Prompt.find({});
    res.send(prompts);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get all Q&A's
const getAllQnAs = async (req, res) => {
  try {
    const qnas = await QnA.find({});
    res.send(qnas);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// filter content based on tags and content type
const filterContentByTags = async (req, res) => {
  // tags is an array of strings, type is either all/article/prompt/qna
  const { tags, type } = req.body;
  try {
    let contents = [];
    switch (type) {
      // returns all content objects with the tags
      case 'all':
        contents = await Content.find({ tags: { $in: tags } });
        break;
        // returns article/journal/content with the tags
      default:
        contents = await Content.find({ type, tags: { $in: tags } });
        break;
    }
    res.send(contents);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// search articles by title, date, or author
const searchArticle = async (req, res) => {
  // type is either title/date/author, content is the stuff you're searching for
  const { type, content } = req.body;
  try {
    let articles = [];
    switch (type) {
      case 'title':
        articles = await Prompt.find({ question: { $regex: content, $options: 'i' } });
        break;
      case 'date':
        articles = await Article.find({ publishDate: content });
        break;
      case 'author':
        articles = await Article.find({ author: { $regex: content, $options: 'i' } });
        break;
      default:
    }
    res.send(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// search prompts by question
const searchPromptByQuestion = async (req, res) => {
  // question is the journal prompt
  const { question } = req.body;
  try {
    // regex matching, case insensitive
    const prompts = await Prompt.find({ question: { $regex: question, $options: 'i' } });
    res.send(prompts);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// search Q&As by whether it was answered, who answered, question/answer string
const searchQnA = async (req, res) => {
  // type is either answered/whoAnswered/question/answer, content is the stuff you're searching for
  const { type, content } = req.body;
  try {
    let qnas = [];
    switch (type) {
      case 'answered':
        qnas = await Prompt.find({ answered: content });
        break;
      case 'whoAnswered':
        qnas = await Article.find({ whoAnswered: { $regex: content, $options: 'i' } });
        break;
      case 'question':
        qnas = await Article.find({ question: { $regex: content, $options: 'i' } });
        break;
      case 'answer':
        qnas = await Article.find({ answer: { $regex: content, $options: 'i' } });
        break;
      default:
    }
    res.send(qnas);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllContent,
  getAllArticles,
  getAllPrompts,
  getAllQnAs,
  filterContentByTags,
  searchArticle,
  searchPromptByQuestion,
  searchQnA,
};
