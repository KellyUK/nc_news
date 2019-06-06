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
          message: "Cannot update votes, invalid input"
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
  console.log(req.query);
  fetchAllArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

//post***
exports.createCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  postCommentByArticleId(article_id, req.body)
    .then(([newComment]) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};
