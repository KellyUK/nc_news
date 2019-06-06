const articlesRouter = require("express").Router();
const {
  sendArticle,
  sendAllArticles,
  patchArticleById,
  sendCommentsByArticleId,
  createCommentByArticleId
} = require("../controllers/articles");

articlesRouter.route("/").get(sendAllArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(createCommentByArticleId);

console.log("routes...");

module.exports = articlesRouter;
