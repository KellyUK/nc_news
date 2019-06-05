const articlesRouter = require("express").Router();
const { sendArticle, patchArticleById } = require("../controllers/articles");

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchArticleById);

module.exports = articlesRouter;
