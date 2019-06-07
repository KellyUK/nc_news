const articlesRouter = require("express").Router();
const {
  sendArticle,
  sendAllArticles,
  patchArticleById,
  sendCommentsByArticleId,
  createCommentByArticleId
} = require("../controllers/articles");

const { methodNotAllowed } = require("../errors/index");

articlesRouter.route("/").get(sendAllArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchArticleById)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(createCommentByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
