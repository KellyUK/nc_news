const { fetchArticle, updateVoteCount } = require("../models/articles");

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No article found"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const increment = req.body.inc_votes;
  updateVoteCount(article_id, increment);
  res.status(200);
};
