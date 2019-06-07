const {
  fetchArticle,
  fetchAllArticles,
  updateVoteCount,
  fetchCommentsByArticleId,
  postCommentByArticleId
} = require("../models/articles");

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          message: "No article found"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const increment = req.body.inc_votes;
  updateVoteCount(article_id, increment)
    .then(article => {
      if (!article || !increment) {
        return Promise.reject({
          status: 400,
          msg: "Cannot update votes, invalid input"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.sendAllArticles = (req, res, next) => {
  const { sort_by, order, ...otherQuery } = req.query;
  fetchAllArticles({ sort_by, order, ...otherQuery })
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.createCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  postCommentByArticleId({ article_id, username, body })
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 400,
          message: "invalid input, new comments must include body and author"
        });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};
