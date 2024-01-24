// these are all read functions!
const Article = require('../models/ArticleSchema');
const Prompt = require('../models/PromptSchema');
const QnA = require('../models/QnASchema');

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

// get ALL content (all articles, qnas, prompts)
const getAllContent = async (req, res) => {
  try {
    const content = getAllArticles().concat(getAllPrompts(), getAllQnAs());
    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// filter content based on tags and content type
const filterContentByTags = async (req, res) => {
  // type is either article/prompt/qna/all, tags is an array of strings
  const { type, tags } = req.body;
  try {
    let contents = [];
    switch (type) {
      // returns article/qna/prompt with the tags
      case 'article':
        contents = await Article.find({ tags: { $in: tags } });
        break;
      case 'prompt':
        contents = await Prompt.find({ tags: { $in: tags } });
        break;
      case 'qna':
        contents = await QnA.find({ tags: { $in: tags } });
        break;
      // returns all content objects with the tags
      default:
        contents = [].concat(
          await Article.find({ tags: { $in: tags } }),
          await Prompt.find({ tags: { $in: tags } }),
          await QnA.find({ tags: { $in: tags } }),
        );
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
  // type is either title/date/author, content is stuff you're searching for
  const { type, content } = req.body;
  // escape special characters when doing regex matching
  const escapedContent = content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    let articles = [];
    switch (type) {
      case 'date':
        articles = await Article.find({ publishDate: escapedContent });
        break;
      case 'author':
        // regex matching, case insensitive
        articles = await Article.find({ author: { $regex: escapedContent, $options: 'i' } });
        break;
      default: // case 'title':
        articles = await Prompt.find({ question: { $regex: escapedContent, $options: 'i' } });
        break;
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
  const escapedQuestion = question.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    // regex matching, case insensitive
    const prompts = await Prompt.find({ question: { $regex: escapedQuestion, $options: 'i' } });
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
  const escapedContent = content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    let qnas = [];
    switch (type) {
      case 'answered':
        qnas = await Prompt.find({ answered: escapedContent });
        break;
      case 'whoAnswered':
        qnas = await Article.find({ whoAnswered: { $regex: escapedContent, $options: 'i' } });
        break;
      case 'answer':
        qnas = await Article.find({ answer: { $regex: escapedContent, $options: 'i' } });
        break;
      default: // case 'question':
        qnas = await Article.find({ question: { $regex: escapedContent, $options: 'i' } });
        break;
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
